import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  try {
    const preference = {
      items: [
        {
          title: body.title,
          quantity: 1,
          currency_id: "ARS",
          unit_price: body.price,
        },
      ],
      payer: {
        name: body.name,
        email: body.email,
      },
      back_urls: {
        success: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/success`,
        failure: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/failure`,
        pending: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/pending`,
      },
      payment_methods: {
        excluded_payment_types: [],
        installments: 6, // Número máximo de cuotas permitidas
      },
      auto_return: "approved",
    };

    const response = await fetch("https://api.mercadopago.com/checkout/preferences", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${"TEST-4123421642745002-123020-7d95c5affb27c6e0ac1ed6c075221bfa-2185272889"}`,
      },
      body: JSON.stringify(preference),
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error creating payment preference:", error);
    return NextResponse.json({ error: "Payment preference creation failed" }, { status: 500 });
  }
}
