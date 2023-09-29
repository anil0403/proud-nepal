"use client";

import { ColumnDef } from "@tanstack/react-table";

import { CellAction } from "./cell-action";

export type ProductColumn = {
  id: string;
  name: string;
  price: Number | null;
  category: string;
  size: string;
  color: string;
  stock: Number;
  ram: String;
  fingerPrint: String;
  dsiplay: String;
  camera: String;
  wlanBluetooth: String;
  battery: String;
  powerAdapter: String;
  storage: String;
  createdAt: string;
  isFeatured: boolean;
  isArchived: boolean;
  newPrice: Number | null;
  discount: Number | null;
};

export const columns: ColumnDef<ProductColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "isArchived",
    header: "Archived",
  },
  {
    accessorKey: "isFeatured",
    header: "Featured",
  },
  {
    accessorKey: "price",
    header: "MRP",
  },
  {
    accessorKey: "discount",
    header: "Discount",
  },
  {
    accessorKey: "newPrice",
    header: "Price",
  },
  {
    accessorKey: "category",
    header: "Brand",
  },
  {
    accessorKey: "stock",
    header: "Stock",
  },
  {
    accessorKey: "size",
    header: "Processor",
  },
  {
    accessorKey: "ram",
    header: "RAM",
  },
  {
    accessorKey: "storage",
    header: "Storage",
  },
  {
    accessorKey: "fingerPrint",
    header: "Finger Print Sensor",
  },
  {
    accessorKey: "dsiplay",
    header: "Display",
  },
  {
    accessorKey: "camera",
    header: "Camera",
  },
  {
    accessorKey: "wlanBluetooth",
    header: "WLAN | Bluetooth",
  },
  {
    accessorKey: "battery",
    header: "Battery",
  },
  {
    accessorKey: "powerAdapter",
    header: "Power Adapter",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
