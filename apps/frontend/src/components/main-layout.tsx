import { Outlet } from 'react-router';
import { Toaster } from './ui/sonner';
import Header from './header';

function MainLayout() {
  return (
    <>
      <Header />
      <main className="flex min-h-[calc(100vh-64px)] flex-col items-center justify-start px-6 pb-5 pt-16">
        <Outlet />
      </main>
      {/* <div className="flex min-h-screen flex-col items-center justify-center p-4">
        <div className="w-full max-w-2xl px-4 md:min-w-[500px]"> */}
      {/* <Card className="relative w-full max-w-2xl shadow-lg sm:min-w-[500px]">
          <img
            src={mascotImage}
            alt="HiKorea Mascot"
            className="absolute -right-12 -top-40 h-64 w-64 object-contain"
          /> */}

      {/* </Card> */}
      {/* </div> */}

      <Toaster expand={true} />
      {/* </div> */}
    </>
  );
}

export default MainLayout;
