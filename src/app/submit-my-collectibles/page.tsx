import SubmitMyCollectiblesSteps from '@/components/layout/SubmitMyCollectiblesSteps';

export default function Page() {
  return (
    <div className="py-[100px] lg:px-[50px] md:px-[30px] px-[20px]">
      <div className="relative mx-auto max-w-[1000px]">
          <div className="absolute top-[-20%] left-0  bg-[#EFB24D]/50 blur-[700px] -z-0 h-full w-full pointer-events-none"></div>
        <SubmitMyCollectiblesSteps />
      </div>
    </div>
  );
}
