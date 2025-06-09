'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button'; // Предполагается, что shadcn/ui настроен и есть кнопка

export default function UnauthorizedPage() {
    const router = useRouter();

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-200 to-gray-400 font-sans px-4 text-center">
            <div className="relative w-[55px] h-[45px] bg-gray-800 rounded-md animate-dip">
                <div className="absolute left-1/2 top-[-30px] -translate-x-1/2 h-[30px] w-[15px] border-4 border-gray-800 border-b-transparent rounded-t-md animate-lockSpin"></div>
                <div className="absolute left-1/2 top-[-10px] -translate-x-1/2 h-[20px] w-[15px] border-l-4 border-r-4 border-l-gray-800 border-r-transparent animate-spin"></div>
            </div>

            <h1 className="text-3xl font-bold mt-10 mb-2">ДОСТУП ЗАПРЕЩЕН</h1>
            <p className="text-gray-700 mb-8 max-w-sm">
                Пожалуйста, свяжитесь с администрацией или разработчиком, если считаете, что это ошибка.
            </p>

            <Button onClick={() => router.push('/orders')} className="w-40 mx-auto">
                Перейти к заказам
            </Button>

            <style jsx>{`
        @keyframes dip {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(8px);
          }
        }

        @keyframes lockSpin {
          0%, 65% {
            top: -45px;
          }
          100% {
            top: -30px;
          }
        }

        @keyframes spin {
          0% {
            transform: scaleX(-1);
            left: calc(50% - 30px);
          }
          65% {
            transform: scaleX(1);
            left: calc(50% - 12.5px);
          }
        }

        .animate-dip {
          animation: dip 1.5s ease-in-out infinite;
        }

        .animate-lockSpin {
          animation: lockSpin 2s forwards ease-in-out;
        }

        .animate-spin {
          animation: spin 2s forwards ease-in-out;
        }
      `}</style>
        </div>
    );
}
