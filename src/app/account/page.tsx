import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const mockOrders = [
  {
    id: "ORD-001",
    date: "2023-10-26",
    total: 2598.99,
    status: "Delivered",
    items: "Galaxy Book 4 Ultra, Logitech MX Master 3S",
  },
  {
    id: "ORD-002",
    date: "2023-09-15",
    total: 1599.00,
    status: "Delivered",
    items: "GeForce RTX 4090",
  },
  {
    id: "ORD-003",
    date: "2024-01-05",
    total: 3499.00,
    status: "Shipped",
    items: "Gaming PC Pro",
  },
];

export default function AccountPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 font-headline">My Account</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Profile</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="font-semibold">Name</p>
                <p className="text-muted-foreground">Demo User</p>
              </div>
              <div>
                <p className="font-semibold">Email</p>
                <p className="text-muted-foreground">demo.user@example.com</p>
              </div>
              <Separator />
              <p className="text-sm text-muted-foreground">This is a mock account page. Login functionality is not implemented.</p>
            </CardContent>
          </Card>
        </div>
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Order History</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>{order.date}</TableCell>
                      <TableCell>₹{order.total.toFixed(2)}</TableCell>
                      <TableCell>
                        <Badge variant={order.status === 'Delivered' ? 'default' : 'secondary'} className={order.status === 'Delivered' ? 'bg-green-600' : ''}>{order.status}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
