"use client";

import * as z from "zod";
import axios from "axios";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Trash } from "lucide-react";
import { Core } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { Heading } from "@/components/ui/heading";
import { AlertModal } from "@/components/modals/alert-modal";

const formSchema = z.object({
  core: z.string().min(0).optional(),
  thread: z.string().min(0).optional(),
});

type CoreFormValues = z.infer<typeof formSchema>;

interface CoreFormProps {
  initialData: Core | null;
}

export const CoreForm: React.FC<CoreFormProps> = ({ initialData }) => {
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? "Edit Core" : "Create Core";
  const description = initialData
    ? "Edit a Core."
    : "Add a new Core";
  const toastMessage = initialData
    ? "Core updated."
    : "Core created.";
  const action = initialData ? "Save changes" : "Create";

  const form = useForm<CoreFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      core: "",
      thread: "",
    },
  });

  const onSubmit = async (data: CoreFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(
          `/api/admin/core/${params.coreId}`,
          data
        );
      } else {
        await axios.post(`/api/admin/core`, data);
      }
      router.refresh();
      router.push(`/admin/core`);
      toast.success(toastMessage);
    } catch (error: any) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/admin/core/${params.coreId}`);
      router.refresh();
      router.push(`/admin/core`);
      toast.success("Core deleted.");
    } catch (error: any) {
      toast.error(
        "Make sure you removed all products using this Core first."
      );
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            disabled={loading}
            variant="destructive"
            size="sm"
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <div className="md:grid md:grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="core"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Core</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="No. of cores"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="thread"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Thread</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-x-4">
                      <Input
                        disabled={loading}
                        placeholder="No. of threads"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};
