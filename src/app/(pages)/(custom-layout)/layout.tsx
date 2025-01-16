
import NavBar from '@/app/_components/NavBar/NavBar';


export default function layout({children}: {children: React.ReactNode}) {
  
    return (
     <NavBar>{children}</NavBar>
    )
}
