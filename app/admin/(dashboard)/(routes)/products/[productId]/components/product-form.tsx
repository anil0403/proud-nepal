"use client";

import * as z from "zod";
import axios from "axios";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Trash } from "lucide-react";

import {
  Category,
  Color,
  Image,
  Product,
  Size,
  Ram,
  Core,
} from "@prisma/client";
import { useParams, useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { Heading } from "@/components/ui/heading";
import { AlertModal } from "@/components/modals/alert-modal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import ImageUpload from "@/components/ui/image-upload";
import { Checkbox } from "@/components/ui/checkbox";

const formSchema = z.object({
  name: z.string().min(1),
  images: z.object({ url: z.string() }).array(),
  price: z.coerce.number().min(1),
  stock: z.coerce.number().min(0).optional(),
  memorySlot: z.string().min(1),
  storage: z.string().min(1),
  StorageSlot: z.string().min(1),
  keyboard: z.string().min(1),
  camera: z.string().min(1),
  display: z.string().min(1),
  ethernet: z.string().min(1),
  wlanBluetooth: z.string().min(1),
  fingerPrint: z.string().min(1),
  powerAdapter: z.string().min(1),
  battery: z.string().min(1),
  categoryId: z.string().min(1),
  colorId: z.string().min(1),
  sizeId: z.string().min(1),
  ramId: z.string().min(1),
  warrantyNew: z.string().optional(),
  coreId: z.string().min(0).optional(),

  freeItems: z.string().min(0).optional(),
  warranty: z.coerce.number().min(0).optional(),
  discount: z.coerce.number().min(0).optional(),
  newPrice: z.coerce.number().min(0).optional(),

  fbLink: z.string().min(0).optional(),
  tiktokLink: z.string().min(0).optional(),
  instaLink: z.string().min(0).optional(),
  isFeatured: z.boolean().default(false).optional(),
  isArchived: z.boolean().default(false).optional(),
  isGaming: z.boolean().default(false).optional(),
  isOffice: z.boolean().default(false).optional(),
  isStudent: z.boolean().default(false).optional(),
});

type ProductFormValues = z.infer<typeof formSchema>;

interface ProductFormProps {
  initialData:
    | (Product & {
        images: Image[];
      })
    | null;
  categories: Category[];
  cores: Core[];
  colors: Color[];
  sizes: Size[];
  rams: Ram[];
}

export const ProductForm: React.FC<ProductFormProps> = ({
  initialData,
  categories,
  sizes,
  colors,
  rams,
  cores,
}) => {
  console.log(`cores = ${cores}`);
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? "Edit product" : "Create product";
  const description = initialData ? "Edit a product." : "Add a new product";
  const toastMessage = initialData ? "Product updated." : "Product created.";
  const action = initialData ? "Save changes" : "Create";

  const defaultValues = initialData
    ? {
        ...initialData,
        // price: parseFloat(String(initialData?.price)),
        // stock: parseFloat(String(initialData?.stock)),
        // discount: parseFloat(String(initialData?.discount)), // Corrected here
        // newPrice: parseFloat(String(initialData?.newPrice)), // Corrected here
        // warranty: parseFloat(String(initialData?.warranty)),

        discount:
          initialData?.discount !== null
            ? parseFloat(String(initialData?.discount))
            : 0,
        price:
          initialData?.discount !== null
            ? parseFloat(String(initialData?.price))
            : 0,
        stock:
          initialData?.discount !== null
            ? parseFloat(String(initialData?.stock))
            : 0,
        newPrice:
          initialData?.discount !== null
            ? parseFloat(String(initialData?.newPrice))
            : 0,
        warranty:
          initialData?.discount !== null
            ? parseFloat(String(initialData?.warranty))
            : 0,
        coreId: initialData?.coreId !== null ? initialData?.coreId : "",

        isFeatured:
          initialData?.isFeatured === null
            ? undefined
            : initialData?.isFeatured,
        isArchived:
          initialData?.isArchived === null
            ? undefined
            : initialData?.isArchived,
        isGaming:
          initialData?.isGaming === null ? undefined : initialData?.isGaming,
        isOffice:
          initialData?.isOffice === null ? undefined : initialData?.isOffice,
        isStudent:
          initialData?.isStudent === null ? undefined : initialData?.isStudent,

        fbLink: initialData?.fbLink === null ? undefined : initialData?.fbLink,
        tiktokLink:
          initialData?.tiktokLink === null
            ? undefined
            : initialData?.tiktokLink,
        instaLink:
          initialData?.instaLink === null ? undefined : initialData?.instaLink,

        freeItems:
          initialData?.freeItems === null ? undefined : initialData?.freeItems,

        warrantyNew:
          initialData?.warrantyNew === null
            ? undefined
            : initialData?.warrantyNew,
      }
    : {
        name: "",
        images: [],
        price: 0,
        stock: 0,
        discount: 0,
        warranty: 0,
        newPrice: 0,
        categoryId: "",
        freeItems: "",
        colorId: "",
        sizeId: "",
        ramId: "",
        coreId: "",
        fbLink: "",
        tiktokLink: "",
        instaLink: "",
        warrantyNew: "",
        isFeatured: false,
        isArchived: false,
        isGaming: false,
        isOffice: false,
        isStudent: false,
      };

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = async (data: ProductFormValues) => {
    console.log("onsubmit");
    try {
      setLoading(true);
      if (initialData) {
        console.log("updating");
        await axios.patch(
          `/api/admin/products/${params.productId}`,
          data
        );
      } else {
        console.log("posting");
        await axios.post(`/api/admin/products`, data);
      }
      router.refresh();
      router.push(`/admin/products`);
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
      await axios.delete(`/api/admin/products/${params.productId}`);
      router.refresh();
      router.push(`/admin/products`);
      toast.success("Product deleted.");
    } catch (error: any) {
      toast.error("Something went wrong.");
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
          <FormField
            control={form.control}
            name="images"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Images</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value.map((image:any) => image.url)}
                    disabled={loading}
                    onChange={(url) =>
                      field.onChange([...field.value, { url }])
                    }
                    onRemove={(url) =>
                      field.onChange([
                        ...field.value.filter((current:any) => current.url !== url),
                      ])
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="md:grid md:grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="LEGION 5"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Brand</FormLabel>
                  <Select
                    disabled={loading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="LENEVO"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="sizeId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Processor</FormLabel>
                  <Select
                    disabled={loading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Select a Processor"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {sizes.map((size) => (
                        <SelectItem key={size.id} value={size.id}>
                          {size.name} {size.value}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="coreId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cores & Threads</FormLabel>
                  <Select
                    disabled={loading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Select core & thread"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {cores?.map((item) => (
                        <SelectItem key={item.id} value={item.id}>
                          {item.core} {item.thread}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="colorId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Graphics</FormLabel>
                  <Select
                    disabled={loading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Select a Graphics Card"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {colors.map((color) => (
                        <SelectItem key={color.id} value={color.id}>
                          {color.name} {color.value}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="ramId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>RAM (Memory)</FormLabel>
                  <Select
                    disabled={loading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Select  RAM Size"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {rams.map((ram) => (
                        <SelectItem key={ram.id} value={ram.id}>
                          {ram.name} {ram.value}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="memorySlot"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Memory Slot</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Two DDR4 SO-DIMM slots, dual-channel capable"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="storage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Storage</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="512GB SSD M.2 2280 PCIe 3.0x4 NVMe"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="StorageSlot"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Storage Slot</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Two M.2 2280 PCIe 3.0 x4 slots"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="display"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Display</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="15.6 FHD (1920x1080) IPS 250nits Anti-glare, 45% NTSC, 120Hz, FreeSync"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="camera"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Camera</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="HD 720p with E-shutter"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="ethernet"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ethernet</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="100/1000M (RJ-45)"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="wlanBluetooth"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>WLAN | Bluetooth</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Wi-Fi 6, 11ax 2x2 + BT5.1"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="keyboard"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Keyboard</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="White Backlit, English (US)"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="battery"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Battery</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Integrated 60Wh"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="powerAdapter"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Power Adapter</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="230W Slim Tip (3-pin)"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="fingerPrint"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fingerprint Sensor</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="None" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="stock"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Stock</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={loading}
                      placeholder="Items in stock"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="fbLink"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Facebook Link</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="facebook link"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tiktokLink"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tiktok Link</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="tiktok link"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="instaLink"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Instagram Link</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="instagram link"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>MRP</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={loading}
                      placeholder="MRP of product"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="discount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Discount Amount</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={loading}
                      placeholder="discount in amount"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="newPrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Price (leave empty)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled
                      placeholder="leave empty"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="freeItems"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Free Items</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      disabled={loading}
                      placeholder="free items (bag, mouse)"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="warrantyNew"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>warranty</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Enter Warranty Period"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="col-span-3 flex flex-row w-full  gap-5">
              <FormField
                control={form.control}
                name="isFeatured"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        // @ts-ignore
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Featured</FormLabel>
                      <FormDescription>
                        This product will appear on the home page
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="isArchived"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        // @ts-ignore
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Archived</FormLabel>
                      <FormDescription>
                        This product will not appear anywhere in the store.
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="isGaming"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        // @ts-ignore
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Gaming Product</FormLabel>
                      <FormDescription>
                        This product will be featured as a gaming product
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="isOffice"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        // @ts-ignore
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Office Product</FormLabel>
                      <FormDescription>
                        This product will be featured as a Office product
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="isStudent"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        // @ts-ignore
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Student Product</FormLabel>
                      <FormDescription>
                        This product will be featured as a student product
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
            </div>
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};
