import {useState,useEffect} from 'react'
import {axiosWithToken} from '../../AxiosWithToken/AxiosWithToken'
import axios from 'axios';
import { useSelector } from "react-redux";
import { useNavigate, Outlet } from "react-router-dom";

function Articles() {
    const [articlesList, setArticlesList] = useState([]);
  let navigate = useNavigate();

  const getArticles=async()=>{
    let token = localStorage.getItem('token')
    console.log(token)
    let res=await axiosWithToken.get('http://localhost:4000/user-api/articles')
    console.log(res)
    setArticlesList(res.data.payload)
  }

  const readArticleUsingArticleId=(articleObj)=>{
    navigate(`../article/${articleObj.articleId}`,{state:articleObj})
  }

  useEffect(()=>{
    getArticles()
  },[])


  return (
    <div>
    <div>
    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4 mt-5">
      {articlesList.map((article) => (
        <div className="col" key={article.articleId}>
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">{article.title}</h5>
              <p className="card-text">
                {article.content.substring(0, 80) + "...."}
              </p>
              <button className="btn btn-warning" onClick={()=>readArticleUsingArticleId(article)}>
                Read More
              </button>
            </div>
            <div className="card-footer">
              <small className="text-body-secondary">
                Last updated on {article.dateOfModification}
              </small>
            </div>
          </div>
        </div>
      ))}
    </div>
    <Outlet />
  </div>
  </div>
  )
}

export default Articles
