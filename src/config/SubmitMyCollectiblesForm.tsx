import { SubmitMyCollectiblesFormSteps } from '@/types/submit-my-collectibles/SubmitMyCollectibles';

export const SubmitMyCollectiblesForm: SubmitMyCollectiblesFormSteps[] = [
  {
    id: 1,
    title: 'Ship your cards & comics to Fcookie',
    fieldType: 'info',
    fieldName: 'additionalInfo', 
    content: (
      <div className="text-center">
        <p className="mb-8">
          Send PSA, SGC, CGC, CSG, or BGS graded cards or comics directly from your home, marketplaces, and grading services based in the United States
        </p>
      </div>
    )
  },
  {
    id: 2,
    title: 'Enter this address when shipping cards to our vault:',
    fieldType: 'info',
    fieldName: 'additionalInfo', 
    content: (
      <ul className="space-y-1 my-[15px]">
        <li>Fcookie</li>
        <li>San Francisco</li>
        <li>1200 Market St, Suite 450</li>
      </ul>
    )
  },
  {
    id: 3,
    title: `As you prepare to ship your graded cards to our vault, you’ll need to provide:`,
    fieldType: 'info',
    fieldName: 'additionalInfo',
    content: (
      <ul className="list-decimal list-inside space-y-1 my-[15px]">
        <li>Tracking number URL</li>
        <li>Total number of cards you're sending</li>
        <li>Photo of your cards</li>
        <li>A copy of your receipt (for marketplace or grading services)</li>
      </ul>
    )
  },
  {
    id: 4,
    title: 'We only accept graded cards and comics from the following:',
    fieldType: 'info',
    fieldName: 'additionalInfo',
    content: (
      <ol className="list-decimal list-inside space-y-1 my-[15px]">
        <li>BGS</li>
        <li>CGC</li>
        <li>PSA</li>
        <li>SGC</li>
        <li>CSG</li>
      </ol>
    )
  },
  {
    id: 5,
    title: 'Enter your tracking URL*',
    description: 'If you do not have your tracking URL, please wait to submit the form.',
    fieldType: 'url',
    fieldName: 'trackingUrl',
    required: true,
    placeholder: 'https://'
  },
  {
    id: 6,
    title: 'How many items are you sending?*',
    fieldType: 'text',
    fieldName: 'itemsCount',
    required: true,
    placeholder: 'Type your answer here...'
  },
  {
    id: 7,
    title: 'Add a screenshot of your items*',
    fieldType: 'file',
    fieldName: 'itemsScreenshot',
    required: true
  },
  {
    id: 8,
    title: 'Add a screenshot of your receipt',
    fieldType: 'file',
    fieldName: 'receiptScreenshot',
    required: true
  },
  {
    id: 9,
    title: 'What country do you live in?*',
    fieldType: 'text',
    fieldName: 'country',
    required: true,
    placeholder: 'Type your answer here...'
  },
  {
    id: 10,
    title: 'Anything else we should know?',
    fieldType: 'textarea',
    fieldName: 'additionalInfo',
    required: false,
    placeholder: 'Type your answer here...'
  }
];