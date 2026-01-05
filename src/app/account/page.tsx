"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useUser, useFirestore, useDoc, useMemoFirebase } from "@/firebase";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { doc } from "firebase/firestore";
import type { User as AppUser } from "@/lib/types";
import { useAuth } from "@/hooks/use-auth";

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
  const { user: firebaseUser, isUserLoading } = useUser();
  const { logout } = useAuth();
  const firestore = useFirestore();
  const router = useRouter();

  const userDocRef = useMemoFirebase(() => {
    if (!firestore || !firebaseUser) return null;
    return doc(firestore, "users", firebaseUser.uid);
  }, [firestore, firebaseUser]);

  const { data: userProfile, isLoading: isProfileLoading } = useDoc<AppUser>(userDocRef);

  useEffect(() => {
    if (!isUserLoading && !firebaseUser) {
      router.push('/login');
    }
  }, [firebaseUser, isUserLoading, router]);

  const isLoading = isUserLoading || isProfileLoading;

  if (isLoading || !firebaseUser) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p>Loading...</p>
      </div>
    );
  }

  const displayName = userProfile ? `${userProfile.firstName} ${userProfile.lastName}`.trim() : firebaseUser.displayName;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold font-headline">My Account</h1>
        <Button variant="outline" onClick={logout}>Logout</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Profile</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="font-semibold">Name</p>
                <p className="text-muted-foreground">{displayName || 'N/A'}</p>
              </div>
              <div>
                <p className="font-semibold">Email</p>
                <p className="text-muted-foreground">{firebaseUser.email}</p>
              </div>
              <Separator />
               <p className="text-sm text-muted-foreground">This is your account page. Order history is mocked.</p>
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
                      <TableCell>₹{Math.floor(order.total)}</TableCell>
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
