import ListIndex from "../components/List_index"
import Link from 'next/link';

export default function IndexPage() {
  return (
    <div style={{maxWidth:'640px', display:'flex', flexWrap:'wrap' 
                               , justifyContent:'center'
                               , backgroundColor:'white'
                               , margin: ' 0 auto'
                               , width: '98%'
                }}>
      <div>
        <h2>Más recientes:</h2>
      </div>
  
      <ListIndex/>
      
     
    </div>

  )
}
