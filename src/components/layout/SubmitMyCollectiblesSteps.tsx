'use client';

import { useState, useRef } from 'react';
import { SubmitMyCollectiblesFormData } from '@/types/submit-my-collectibles/SubmitMyCollectibles';
import { SubmitMyCollectiblesForm } from '@/config/SubmitMyCollectiblesForm';
import Image from 'next/image';

const SubmitMyCollectiblesSteps = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<SubmitMyCollectiblesFormData>({
    itemsCount: '',
    itemsScreenshot: null,
    receiptScreenshot: null,
    country: '',
    trackingUrl: '',
    additionalInfo: '',
  });
  const itemsFileInputRef = useRef<HTMLInputElement>(null);
  const receiptFileInputRef = useRef<HTMLInputElement>(null);

  const currentStepConfig = SubmitMyCollectiblesForm[currentStep];
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === SubmitMyCollectiblesForm.length - 1;

  // Calculate progress percentage
  const calculateProgress = () => {
    const totalSteps = SubmitMyCollectiblesForm.length - 1; 
    const currentProgressStep = currentStep;
    
    if (currentProgressStep <= 0) return 0;
    if (currentProgressStep >= totalSteps) return 100;
    
    return (currentProgressStep / totalSteps) * 100;
  };

  const progressPercentage = calculateProgress();

  const nextStep = () => {
    if (currentStep < SubmitMyCollectiblesForm.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const updateFormData = (field: keyof SubmitMyCollectiblesFormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileChange = (field: 'itemsScreenshot' | 'receiptScreenshot', e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    updateFormData(field, file);
  };

  const handleDrop = (field: 'itemsScreenshot' | 'receiptScreenshot', e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0] || null;
    updateFormData(field, file);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const renderField = () => {
    const { fieldType, fieldName, placeholder, required} = currentStepConfig;

    switch (fieldType) {
      case 'text':
      case 'url':
        return (
          <>
            <input
              type={fieldType === 'url' ? 'url' : 'text'}
              value={formData[fieldName] as string}
              onChange={(e) => updateFormData(fieldName, e.target.value)}
              placeholder={placeholder}
              className="w-full px-[25px] py-[15px] duration-300 focus-visible:border-[#fff] placeholder:text-[#FFFFFF80] border border-[#FFFFFF1C] rounded-[7px] focus-visible:outline-none"
              required={required}
            />
          </>
        );

      case 'textarea':
        return (
          <textarea
            value={formData[fieldName] as string}
            onChange={(e) => updateFormData(fieldName, e.target.value)}
            placeholder={placeholder}
            rows={4}
            className="w-full px-[25px] py-[15px] duration-300 focus-visible:border-[#fff] placeholder:text-[#FFFFFF80] border border-[#FFFFFF1C] rounded-[7px] focus-visible:outline-none resize-none"
          />
        );

      case 'file':
        const isItemsScreenshot = fieldName === 'itemsScreenshot';
        const fileInputRef = isItemsScreenshot ? itemsFileInputRef : receiptFileInputRef;
        const currentFile = isItemsScreenshot ? formData.itemsScreenshot : formData.receiptScreenshot;
        
        return (
          <>
            <div
              className="cursor-pointer transition-colors flex gap-[20px] items-center"
              onClick={() => fileInputRef.current?.click()}
              onDrop={(e) => handleDrop(fieldName as 'itemsScreenshot' | 'receiptScreenshot', e)}
              onDragOver={handleDragOver}
            >
              <input
                ref={fileInputRef}
                type="file"
                onChange={(e) => handleFileChange(fieldName as 'itemsScreenshot' | 'receiptScreenshot', e)}
                accept="image/*"
                className="hidden"
              />
              <div className='border border-[#FFFFFF1C] rounded-[7px] px-[40px] py-[20px]'>
                <Image
                  src="/img/upload-placeholder.png"
                  alt="Placeholder"
                  width={300}
                  height={35}
                  className='w-[40px] lg:w-[60px]'
                />
              </div>
              {currentFile ? (
                <div className="text-[#4DCE94] flex flex-col items-start">
                  <p className="font-semibold md:text-base text-sm text-left max-w-[300px]">File selected: {currentFile.name}</p>
                  <p className="text-sm text-[#FFFFFF80] mt-1">
                    Size: {(currentFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              ) : (
                <>
                  <div className='flex flex-col items-start'>
                    <p className="text-[20px]">Choose file or drag here</p>
                    <p className='text-sm mb-3'>Size limit: 10MB</p>
                    <button
                      type="button"
                      className="text-[#EFB24D] flex items-center gap-[5px]"
                    >
                      <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3.47266 3.05819L6.09766 0.5979L8.72266 3.05819" stroke="#EFB24D" strokeWidth="1.19578" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M6.09766 7.16038V0.599609" stroke="#EFB24D" strokeWidth="1.19578" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M11.5977 7.1604V10.4417C11.5977 10.566 11.545 10.6852 11.4512 10.7731C11.3574 10.861 11.2303 10.9104 11.0977 10.9104H1.09766C0.965048 10.9104 0.837871 10.861 0.744103 10.7731C0.650335 10.6852 0.597656 10.566 0.597656 10.4417V7.1604" stroke="#EFB24D" strokeWidth="1.19578" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      Upload File
                    </button>
                  </div>
                </>
              )}
            </div>
          </>
        );

      case 'info':
        return currentStepConfig.content;

      default:
        return null;
    }
  };

  const isStepValid = () => {
    const { fieldType, fieldName, required } = currentStepConfig;

    if (!required) return true;

    const value = formData[fieldName];

    if (fieldType === 'file') {
      return value !== null;
    }

    return typeof value === 'string' && value.trim() !== '';
  };

  const getButtonText = () => {
    if (isFirstStep) return 'Start';
    if (isLastStep) return 'Submit';
    return 'Next';
  };

  const handleButtonClick = (e: React.MouseEvent) => {
    if (isLastStep) {
      handleSubmit(e as any);
    } else {
      nextStep();
    }
  };

  return (
    <div className="w-full py-[50px] lg:px-[50px] md:px-[30px] px-[20px] mx-auto bg-[#FFFFFF0A] rounded-[25px] border border-[#FFFFFF1C] shadow-lg text-black dark:text-white">
      <div className="">
        {/* Step indicator */}
        {!isFirstStep && (
          <div className="flex justify-between flex-col items-center mb-[50px] relative">
            <span className="relative z-[1] text-sm bg-gradient-to-b from-[#75DA5B] to-[#4DCE94] text-black rounded-full p-2 h-[50px] w-[50px] flex items-center justify-center">
              <span className='text-xl font-semibold'>{currentStepConfig.id - 1}</span>/{SubmitMyCollectiblesForm.length - 1}
            </span>
            <div className='absolute top-[50%] -translate-y-[50%] w-full max-w-[550px] mx-auto'>
              <div className='relative bg-[#75DA5B14] w-full h-[3px]'>
                <div 
                  className={`absolute top-0 left-0 bottom-0 h-[3px] bg-[#75DA5B] transition-all duration-300 ease-in-out`}
                  style={{ width: `${progressPercentage}%` }}
                >
                </div>
              </div>
            </div>
          </div>
        )}

        {isFirstStep && (
          <div className='flex items-center justify-center mb-[30px]'>
            <Image
              src="/img/header-logo.png"
              alt="Logo"
              width={300}
              height={35}
              className='w-[120px] lg:w-[150px] transition-all duration-300'
            />
          </div>
        )}

        {/* Title */}
        <h1 className={`font-bold leading-[1.2] ${isFirstStep ? 'text-[25px] md:text-[35px] text-center mb-[20px]' : 'text-[20px] md:text-[25px]'}`}>
          {currentStepConfig.title}
        </h1>
        
        {currentStepConfig.description && (
              <p className="mt-[10px]">{currentStepConfig.description}</p>
        )}


        {/* Form field */}
        <div className={`mt-[20px] ${isFirstStep ? 'max-w-[500px] mx-auto' : 'max-w-[600px]'}`}>
          {renderField()}
        </div>

        {/* Navigation buttons */}
        <div className={`flex text-sm mt-[30px] ${isFirstStep ? 'justify-center' : 'justify-start gap-[20px]'}`}>
          {!isFirstStep && (
            <button
              onClick={prevStep}
              className="px-[20px] py-[10px] min-w-[120px] border border-[#FFFFFF1C] rounded-[7px] text-[#EFB24D]"
            >
              Previous
            </button>
          )}
          
          <button
            onClick={handleButtonClick}
            disabled={!isStepValid() && !isFirstStep}
            className={`px-[20px] py-[10px] rounded-[7px] min-w-[120px] ${
              isFirstStep 
                ? 'bg-[#EFB24D] text-black px-8' 
                : 'bg-[#EFB24D] text-black disabled:opacity-50 disabled:cursor-not-allowed'
            }`}
          >
            {getButtonText()}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubmitMyCollectiblesSteps;