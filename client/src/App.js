
import Home from './components/Home/Home'
import Rootlayout from './components/Rootlayout/Rootlayout'
import Signin from './components/Signin/Signin'
import Signup from './components/Signup/Signup'
import User from './components/user/User'
import Author from './components/Author/Author'
import Admin from './components/Admin/Admin'
import ArticlesByAuthor from './components/ArticlesByAuthor/articlesByAuthor'
import Article from './components/Article/Article'
import Articles from './components/Articles/Articles'
import Addarticles from './components/Addarticles/Addarticles'
import {createBrowserRouter,Navigate,RouterProvider} from 'react-router-dom'
import './App.css';


function App() {
  let router=createBrowserRouter([
    {
      path:'/',
      element:<Rootlayout/>,
      children:[
        {
          path:'/',
          element:<Home/>
        },
        {
          path:'/Signup',
          element:<Signup/>
        },
        {
          path:'/Signin',
          element:<Signin/>
        }, 
        {
          path:'/user',
          element:<User/>,
          children:[
            {
              path:'articles',
              element:<Articles/>
            },
            {
              path:'article/:id',
              element:<Article/>
            }
          ]
        },
        {
          path:'/author',
          element:<Author/>,
          children:[
            {
              path:'article/:id',
              element:<Article/>
            },
            {
              path:'new-article',
              element:<Addarticles/>
            },
            {
              path:'article-by-author/:auth',
              element:<ArticlesByAuthor/>
             }
            // {
            //   path:'',
            //   element:<Navigate to='articles-by-author/:author' />
            // }
          ]
        },
        {
          path:'/admin',
          element:<Admin/>
        }
          
        
      ]
    }
  ])
  return (
    <div className="App">
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
