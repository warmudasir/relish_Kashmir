import Footer from '@/app/components/footer';
import Header from '@/app/components/header';
import React from 'react'


const page = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  // console.log(id);
  return (
    <div>
      <Header/>
      <div style={{padding:'100px',textAlign:'center',display:'flex',justifyContent:'center'}}>
        <div style={{width:'60%'}}>

        <form action="">
          <input type="Name" placeholder='FirstName' style={{border:'1px solid black',display:'block',width:'100%',margin:'5px'}}/>
          <input type="Name"  placeholder='LastName' style={{border:'1px solid black',display:'block',width:'100%'}}/>
          <input type="Name"   placeholder='Email' style={{border:'1px solid black',display:'block',width:'100%'}}/>
          <input type="Name"  placeholder='Phone Number' style={{border:'1px solid black',display:'block',width:'100%'}}/>
          <input type="Name"  placeholder='Address' style={{border:'1px solid black',display:'block',width:'100%'}}/>
          <input type="Name"  placeholder='Pincoded' style={{border:'1px solid black',display:'block',width:'100%'}}/>
          <input type="Name"  placeholder='FirstName'/>
        </form>
        </div>
      </div>
      <Footer/>
    </div>
  )
}

export default page
