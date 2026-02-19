const DJANGO_API_URL = process.env.DJANGO_API_URL || "http://localhost:8000";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      name,
      surname,
      patronymic,
      phone,
      contact_method,
      contact_id,
      delivery_region,
      delivery_method,
      delivery_address,
      europochta_branch,
      payment_method,
      items,
      total,
    } = body;

    if (
      !name ||
      !surname ||
      !phone ||
      !delivery_region ||
      !delivery_method ||
      !payment_method ||
      !items ||
      items.length === 0 ||
      total == null
    ) {
      console.log("[v0] Missing fields:", {
        name: !!name,
        surname: !!surname,
        phone: !!phone,
        delivery_region: !!delivery_region,
        delivery_method: !!delivery_method,
        payment_method: !!payment_method,
        items_count: items?.length || 0,
        total: total != null,
      });
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const orderData = {
      name,
      surname,
      patronymic: patronymic || "",
      phone,
      contact_method,
      contact_id,
      delivery_region,
      delivery_method,
      delivery_address: delivery_address || "",
      europochta_branch: europochta_branch || "",
      payment_method,
      items,
      total,
    };

    console.log("[v0] Sending order data:", orderData);

    const response = await fetch(`${DJANGO_API_URL}/api/orders/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      let error;
      try {
        error = await response.json();
      } catch {
        error = { detail: await response.text() };
      }
      console.log("[v0] Django error (status " + response.status + "):", error);
      return Response.json(
        { error: error.detail || "Failed to create order" },
        { status: response.status },
      );
    }

    const order = await response.json();
    return Response.json({ success: true, orderId: order.id });
  } catch (err) {
    console.error("[v0] Order API error:", err);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
