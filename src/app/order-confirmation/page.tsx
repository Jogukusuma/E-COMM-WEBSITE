import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import Link from "next/link";

export default function OrderConfirmationPage() {
  return (
    <div className="container mx-auto px-4 py-16 flex flex-col items-center text-center">
      <CheckCircle className="h-24 w-24 text-green-500 mb-6" />
      <h1 className="text-4xl font-bold mb-4 font-headline">Thank you for your order!</h1>
      <p className="text-lg text-muted-foreground mb-8 max-w-2xl">
        Your order has been placed successfully. You will receive an email confirmation shortly with your order details and tracking information.
      </p>
      <div className="flex gap-4">
        <Button asChild size="lg">
          <Link href="/">Continue Shopping</Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link href="/account">View Order History</Link>
        </Button>
      </div>
    </div>
  );
}
