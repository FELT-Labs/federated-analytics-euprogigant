import { AppShell, Container, createStyles, MantineProvider, MantineThemeOverride } from '@mantine/core';
import { FC } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

import { CustomFooter } from '@/modules/footer';
import { CustomHeader } from '@/modules/header';
import { TransactionProvider } from '@/modules/transaction';
import { AutomationProvider, Web3Provider } from '@/modules/web3';

const useStyles = createStyles((theme) => ({
  content: {
    background: '#F0F6FF',
    borderRadius: theme.radius.md,
  },
}));

const theme: MantineThemeOverride = {
  colors: {
    blue: [
      '#3E4A65',
      '#344260',
      '#2B3A5C',
      '#213259',
      '#182B57',
      '#0F2557',
      '#051E57',
      '#0C1E47',
      '#101D3B',
      '#121C31',
    ],
  },
};

export const layoutWidth = 1680;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export const AppLayout: FC = ({ children }) => {
  const { classes } = useStyles();

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Web3Provider>
          <AutomationProvider>
            <TransactionProvider>
              <AppShell header={<CustomHeader />} footer={<CustomFooter />}>
                <Container className={classes.content} size={layoutWidth} px="xl" py="xl">
                  {children}
                </Container>
              </AppShell>
            </TransactionProvider>
          </AutomationProvider>
        </Web3Provider>
      </QueryClientProvider>
    </MantineProvider>
  );
};
