import React from 'react'
import Header from './Header';
import Footer from './Footer';
function AppLayout({children}) {
  return (
    <>
    {/* Header part */}
    <Header/>

    {children}
    {/* Footer part */}
    <Footer/>
      </>
  );
}

export default AppLayout
