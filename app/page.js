import HeroSection from "@/components/HeroSection";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { featuresData, howItWorksData, statsData, testimonialsData } from "@/data/landing";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
   <div className="mt-30">
    <HeroSection/>
    <section className="py-20 bg-blue-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {statsData.map((stats,index)=>(
            <div key={index} className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">
                {stats.value}
                </div>
              <div className="text-gray-600">{stats.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center">Everything you need to manage your finances</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {featuresData.map((feature,index)=>(
            <div key={index}>
              <Card>
                <CardContent className="space-y-4 pt-4">
                  {feature.icon}
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </CardContent>
              </Card>

            </div>
          ))}
        </div>
      </div>
    </section>

     <section className="py-20 bg-blue-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center">Everything you need to manage your finances</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {howItWorksData.map((work,index)=>(
          <div key={index} className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">{work.icon}</div>
            <h3 className="text-xl font-semibold mb-4">{work.title}</h3>
            <p className="text-gray-600">{work.description}</p>
          </div>
          ))}
        </div>
      </div>
    </section>

     <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center">What Our Users Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3  gap-4">
          {testimonialsData?.map((testimonial,index)=>(
            <div key={index}>
              <Card className='p-4'>
                <CardContent className="space-y-4 pt-4">
                 <div className="flex items-center mb-4">
                  <Image
                  src={testimonial?.image}
                  alt={testimonial?.name}
                  width={100}
                  height={100}
                  className="rounded-full"
                  />
                  <div className="ml-4">
                    <div className="font-semibold">
                      {testimonial?.name}
                    </div>
                  </div>
                 </div>
                 <p className="text-gray-600">{testimonial?.quote}</p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="py-20 bg-blue-600">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-12 text-center text-white">
          Ready to take control of Your finances? 
       </h2>
       <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
        Join thousands of users who are already managing their finances smarter with Wealth.
       </p>
       <Link href="/dashboard">
       <Button
       size="lg"
       className="bg-white text-blue-600 hover:bg-blue-50 animate-bounce cursor-pointer"
       >
        Start Free Trail
       </Button>
       </Link>
      </div>
    </section>

   </div>
  );
}
