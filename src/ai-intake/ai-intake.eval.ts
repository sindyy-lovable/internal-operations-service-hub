import 'dotenv/config';
import { AiIntakeModelProvider } from './ai-intake.model-provider';
import { AiIntakeProvider } from './ai-intake.provider';
import { AiIntakeService } from './ai-intake.service';

async function runEval(): Promise<void> {
  const realProvider = new AiIntakeModelProvider();
  const realService = new AiIntakeService(realProvider);

  const cases = [
    {
      name: 'clear IT request',
      input: 'My laptop cannot connect to the company Wi-Fi',
    },
    {
      name: 'clear HR request',
      input: 'I need help understanding my annual leave balance',
    },
    {
      name: 'thin input',
      input: 'I need help',
    },
    {
      name: 'ambiguous request',
      input: 'Something is wrong with my account',
    },
    {
  name: 'mixed IT and HR request',
  input:
    'My laptop is not working and I also need help with my annual leave balance',
},
  ];

  for (const testCase of cases) {
    const result = await realService.analyze(testCase.input);

    console.log(`\n${testCase.name}`);
    console.log(result);
  }

  const invalidProvider = {
    analyze: async () => ({
      category: 'FINANCE',
      summary: 'Invalid category',
      needsClarification: false,
    }),
  } as unknown as AiIntakeProvider;

  try {
    await new AiIntakeService(invalidProvider).analyze(
      'I have a payment question',
    );
  } catch {
    console.log('\ninvalid provider output');
    console.log('PASS - backend rejected invalid AI output');
  }

  const failingProvider: AiIntakeProvider = {
    analyze: async () => {
      throw new Error('Provider unavailable');
    },
  };

  try {
    await new AiIntakeService(failingProvider).analyze(
      'My laptop is not working',
    );
  } catch {
    console.log('\nprovider failure');
    console.log('PASS - backend handled provider failure');
  }
}

void runEval();