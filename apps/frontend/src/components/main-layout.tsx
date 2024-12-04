import { Outlet } from 'react-router';
import Footer from './footer';
import { Card } from './ui/card';
import mascotImage from '../assets/hikorea-mascot.png';

function MainLayout() {
  return (
    <div>
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4 relative">
        <div className="flex items-center w-full pt-6 mb-8">
          <h1 className="text-4xl font-bold text-[#013563]">
            Hi Korea Assistant
          </h1>
        </div>
        <Card className="w-full max-w-2xl shadow-lg relative overflow-visible min-w-[500px]">
          <img
            src={mascotImage}
            alt="HiKorea Mascot"
            className="absolute -top-40 -right-12 h-64 w-64 object-contain"
          />
          <Outlet />
        </Card>
      </div>
      <Footer />
    </div>
  );
}

export default MainLayout;
