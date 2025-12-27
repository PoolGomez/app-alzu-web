
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Companies, Dashboard, Home, Login, Register, Tables } from './pages'
import Header from './components/shared/Header';
import useLoadData from './hooks/useLoadData';
import FullScreenLoader from './components/shared/FullScreenLoader';
import { useAppSelector } from './hooks/hooks';
// import useCompanySelect from './hooks/useCompanySelect';
// import AddCompany from './pages/AddCompany';
import type { ReactNode } from 'react';
import Configurations from './pages/Configurations';
import Products from './pages/Products';
import Account from './pages/Account';
import RoomsPage from './pages/Rooms';
import UsersPage from './pages/Users';
import RolesPage from './pages/Roles';


function Layout(){

  const isLoading = useLoadData();
  // const isSelect = useCompanySelect();
  const { isAuth } = useAppSelector((state)=> state.user)
  const { isSelect } = useAppSelector((state)=> state.company)

  if(isLoading) return <FullScreenLoader />

  return(
    <>
      <Routes>
        <Route path="/" element={ <Home />} />
        <Route path="/login" element={ isAuth ? <Navigate to="/dashboard" /> : <Login />} />
        <Route path="/register" element={ isAuth ? <Navigate to="/dashboard" /> : <Register />} />

        <Route path="/dashboard" element={
          isSelect ?
            <ProtectedRoutes>
                <Header>
                  <Dashboard />
                </Header>
            </ProtectedRoutes>
          :
            <Navigate to="/companies"/>
        }/>

        <Route path="/tables" element={
          isSelect ?
            <ProtectedRoutes>
              <Header>
                <Tables /> 
              </Header>
            </ProtectedRoutes>
          :
            <Navigate to="/companies"/>
        }/>
        
        <Route path="/companies" element={
           
          <ProtectedRoutes>
            <Header>
              <Companies /> 
            </Header>
          </ProtectedRoutes>
          

          }  />

        <Route path='/configurations' element={
          <ProtectedRoutes>
            <Header>
              <Configurations />
            </Header>
          </ProtectedRoutes>

        }/>

        <Route path='/products' element={
          <ProtectedRoutes>
            <Header>
              <Products />
            </Header>
          </ProtectedRoutes>

        }/>

        <Route path='/rooms' element={
          <ProtectedRoutes>
            <Header>
              <RoomsPage />
            </Header>
          </ProtectedRoutes>

        }/>

         <Route path='/account' element={
          <ProtectedRoutes>
            <Header>
              <Account />
            </Header>
          </ProtectedRoutes>

        }/>

        <Route path='/users' element={
          <ProtectedRoutes>
            <Header>
              <UsersPage />
            </Header>
          </ProtectedRoutes>

        }/>

        <Route path='/roles' element={
          <ProtectedRoutes>
            <Header>
              <RolesPage />
            </Header>
          </ProtectedRoutes>
        }

        />

        {/* <Route path='/add-company' element={
          
          <ProtectedRoutes>
            <Header>
              <AddCompany />
            </Header>
          </ProtectedRoutes>
          
        } /> */}

        <Route path="*" element={
          // <div>Not Found</div> 
          <Navigate to="/dashboard" />
          } />
        
      </Routes>

      
    </>
  )
}

function ProtectedRoutes({children}:{ children: ReactNode}){
  const {isAuth} = useAppSelector((state)=> state.user);
  if(!isAuth){
    return <Navigate to="/login" />
  }
  return children;
}

function App() {

  return (
    <>
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
    </>
  )
}

export default App
