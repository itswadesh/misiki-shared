export default async function ({ app, error, store, redirect }) {
  try {
    const geo = store.$cookies.get('geo')
    if (!geo) 
    redirect('/onboarding')
  } catch (e) {
  } finally {
  }
}