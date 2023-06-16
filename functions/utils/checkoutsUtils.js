export const frontendCheckoutData = (session) => ({
  success: session.status === 'complete' && session.payment_status === 'paid',
  name: session.customer_details?.name,
  email: session.customer_details?.email,
})
