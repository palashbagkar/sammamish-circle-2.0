// app/actions.ts
"use server";

export async function submitResourceAction(data: any) {
  // Logic to save to a database would go here
  console.log("SERVER RECEIVED DATA:", data);

  // Simulate a delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return { success: true };
}