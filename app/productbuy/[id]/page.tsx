  "use client";

  import React, { useEffect } from 'react';
  import Footer from '@/app/components/footer';
  import Header from '@/app/components/header';
  import { useRouter, useSearchParams } from 'next/navigation';
  import { useForm } from 'react-hook-form';
  import styles from './productbuy.module.scss';

  const Page = ({ params }: { params: { id: string } }) => {
    const { id } = params;
    const searchParams = useSearchParams();
    const quantity = searchParams.get('quantity');
    const name = searchParams.get('name');
    const price = searchParams.get('price');
    const imageUrl = searchParams.get('imageUrl');
    const router = useRouter();

    // console.log(name);
    // console.log(price);
    // console.log(imageUrl);

    const { register, handleSubmit } = useForm();

    useEffect(() => {
      // Dynamically load the Razorpay script
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => {
        console.log('Razorpay script loaded');
      };
      document.body.appendChild(script);
    }, []);

    const orderInfo = async (orderInfo: any) => {
      const itemdata = { itemNumber: id, quantity:quantity,productname:name,productprice:price,imageUrl:imageUrl};
      const finaldata = { ...orderInfo, ...itemdata };

      // const response = await fetch('/api/orderdata', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(finaldata),
      // });

      // if (response.ok) {
      //   const result = await response.json();
      //   console.log(result);

        // Create Razorpay order
        const razorpayResponse = await fetch('/api/checkout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ amount: 1000 * 100 }), // Amount in paise, e.g., ₹1000 becomes 100000
        });

        const orderData = await razorpayResponse.json();

        if (orderData.id) {
          const options = {
            key: 'rzp_test_AlDHhT9lXcsjQf', // Replace with your Razorpay Key ID
            amount: orderData.amount,
            currency: orderData.currency,
            name: 'Relish Kashmir',
            description: 'Sample Product',
            order_id: orderData.id,
            handler:async function (response: any) {
              // Handle successful payment here
              alert('Payment successful');
              
              // Make an API call to create the order in the database
            const orderResponse = await fetch('/api/orderdata', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                ...finaldata,
                paymentId: response.razorpay_payment_id,
                orderId: response.razorpay_order_id,
                signature: response.razorpay_signature,
              }),
            });
            //Sucess Page that order has been placed sucessfully
            // router.push('/success');
            },
            prefill: {
              name: orderInfo.firstName + ' ' + orderInfo.lastName,
              email: orderInfo.email,
              contact: orderInfo.phone,
            },
            notes: {
              address: orderInfo.address,
            },
            theme: {
              color: '#3399cc',
            },
          };

          // Check if Razorpay is loaded correctly
          if (window.Razorpay) {
            const rzp = new window.Razorpay(options);
            rzp.open();
          } else {
            console.error('Razorpay object not available');
          }
        } else {
          console.error('Failed to create order');
        }

    };

    return (
      <div>
        <Header />
        <div style={{ padding: '100px', textAlign: 'center', display: 'flex', justifyContent: 'center' }}>
          <div style={{ width: '60%' }}>
            <form
              style={{ width: '100%', border: '2px solid black', padding: '15px' }}
              onSubmit={handleSubmit(orderInfo)}
            >
              <input
                type="text"
                placeholder='First Name'
                className={styles.input}
                {...register('firstName')}
              />
              <input
                type="text"
                placeholder='Last Name'
                style={{ border: '1px solid black', width: '49%', marginTop: '20px', marginLeft: '2px' }}
                {...register('lastName')}
              />
              <input
                type="email"
                placeholder='Email'
                style={{ border: '1px solid black', display: 'block', width: '100%', marginTop: '20px' }}
                {...register('email')}
              />
              <input
                type="tel"
                placeholder='Phone Number'
                style={{ border: '1px solid black', display: 'block', width: '100%', marginTop: '20px' }}
                {...register('phone')}
              />
              <input
                type="text"
                placeholder='Address'
                style={{ border: '1px solid black', display: 'block', width: '100%', marginTop: '20px' }}
                {...register('address')}
              />
              <input
                type="text"
                placeholder='Pincode'
                style={{ border: '1px solid black', display: 'block', width: '100%', marginTop: '20px' }}
                {...register('pincode')}
              />
              <button className='btn btn-secondary my-3'>Proceed to Payment</button>
            </form>
          </div>
        </div>
        <Footer />
      </div>
    );
  };

  export default Page;
