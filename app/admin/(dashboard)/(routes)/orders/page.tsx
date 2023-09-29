import prismadb from "@/lib/prismadb";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const OrderPage = async () => {
  const orders = await prismadb.cart.findMany({
    include: {
      products: {
        include: {
          images: true,
          category: true,
          color: true,
          size: true,
          ram: true,
          core: true,
        },
      },
      user: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  console.log(orders);

  // const formattedColors: OrderColumn[] = orders.map((item) => ({
  //   id: item.id,
  //   order: item,
  // }));
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>
            <h1>Orders</h1>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {orders?.map((order) => (
            <Card key={order?.id}>
              <CardHeader>
                <CardTitle>{order?.user?.name}</CardTitle>
                <CardDescription>
                  <p>Email : {order?.user?.email}</p>
                  <p>Phone Number : {order?.user?.phone}</p>
                  <p>Address : {order?.user?.address}</p>
                </CardDescription>
              </CardHeader>
              <CardContent>
                {order?.products?.map((product) => (
                  <Table key={product?.id}>
                    <TableHeader>
                      <TableRow>
                        <TableHead style={{ width: "16.66%" }}>
                          Name
                        </TableHead>
                        <TableHead style={{ width: "16.66%" }}>Price</TableHead>
                        <TableHead style={{ width: "16.66%" }}>
                          Processor
                        </TableHead>
                        <TableHead style={{ width: "16.66%" }}>RAM</TableHead>
                        <TableHead style={{ width: "16.66%" }}>
                          Graphics
                        </TableHead>
                        <TableHead style={{ width: "16.66%" }}>
                          Storage
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell
                          style={{ width: "16.66%" }}
                          className="font-medium"
                        >
                          {product?.category?.name} {product?.name}
                        </TableCell>
                        <TableCell style={{ width: "16.66%" }}>
                          {product?.newPrice}
                        </TableCell>
                        <TableCell style={{ width: "16.66%" }}>
                          {product?.size?.name} {product?.size?.value}
                        </TableCell>
                        <TableCell style={{ width: "16.66%" }}>
                          {product?.ram?.name} {product?.ram?.value}
                        </TableCell>
                        <TableCell style={{ width: "16.66%" }}>
                          {product?.color?.name}
                          {product?.color?.value}
                        </TableCell>
                        <TableCell style={{ width: "16.66%" }}>
                          {product?.storage}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                ))}
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderPage;
