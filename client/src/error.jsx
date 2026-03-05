// whenever any backend error came , show this page 
export default function Error() {
    return (
        <div style={{textAlign:"center", marginTop:"100px"}}>
            <h1>Something went wrong ⚠️</h1>
            <p>Unable to fetch data from server.</p>
            <p>Please try again later.</p>
        </div>
    )
}