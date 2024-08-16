import '@/styles/globals.css'
import {TaskProvider} from '@/context/TaskContext'
import NextNProgress from 'nextjs-progressbar';
export default function App({ Component, pageProps }) {

  return <TaskProvider>
    <NextNProgress color="#29D" startPosition={0.3} stopDelayMs={200} height={3} />
    <Component {...pageProps} />
    </TaskProvider>
}

