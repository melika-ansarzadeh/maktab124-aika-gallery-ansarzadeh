import { useRouter } from 'next/router';

const Payment = () => {
  const router = useRouter();
  const { name, email, phone, address } = router.query;

  const handlePaymentSuccess = () => {
    router.push('/payment-success');
  };

  const handlePaymentFailure = () => {
    router.push('/payment-failure');
  };

  return (
    <main className="min-h-screen px-6 py-12 text-[#222] font-sahel">
      <h1 className="text-4xl mb-12">پرداخت خود را انجام دهید</h1>

      <div className="space-y-6 mb-8">
        <div>
          <strong>نام: </strong>
          <span>{name}</span>
        </div>
        <div>
          <strong>ایمیل: </strong>
          <span>{email}</span>
        </div>
        <div>
          <strong>شماره تلفن: </strong>
          <span>{phone}</span>
        </div>
        <div>
          <strong>آدرس: </strong>
          <span>{address}</span>
        </div>
      </div>

      <div className="space-x-4">
        <button
          onClick={handlePaymentSuccess}
          className="w-1/2 bg-green-500 text-white py-2 rounded-lg text-sm tracking-wide hover:opacity-90 transition"
        >
          پرداخت موفق
        </button>
        <button
          onClick={handlePaymentFailure}
          className="w-1/2 bg-red-500 text-white py-2 rounded-lg text-sm tracking-wide hover:opacity-90 transition"
        >
          منصرف شدم
        </button>
      </div>
    </main>
  );
};

export default Payment;
