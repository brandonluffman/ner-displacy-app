import '../styles/globals.css'
import '../styles/index.css'

{/* {responseData && <div>{JSON.stringify(responseData[1])}</div>}
{responseData && <div>Response: {JSON.stringify(responseData[0])}</div>} */}

  // responseData && responseData[0].map((item, i) => (
  //   console.log(item.start, item.end)
  // ))


function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
