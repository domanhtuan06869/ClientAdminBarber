import React, { useEffect, useState } from 'react';
import '../src/assets/css/laptopdesktop.css';
import '../src/assets/css/stylemobile.css';
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
import Admin from '../src/Admin/Admin'
import Login from '../src/Admin/Login'
import withAuth from '../src/Admin/withAuth'
import withAuthLogin from '../src/Admin/withAuthLogin'

function App() {
    const listnews = useSelector(state => state.reducerNews.data);
    const listSlider = useSelector(state => state.reducerSlider.data)

    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true)


    async function getNews() {
        const result = await axios('/getNews')
        dispatch({
            type: "FETCH_NEWS",
            data: result.data
        })
    }
    async function getSlide() {
        const result = await axios('/getSlides')
        dispatch({
            type: "FETCH_SLIDER",
            data: result.data
        })
    }

    async function getAll() {
        await axios.all([getSlide(), getNews()]).then(() => setLoading(false))
    }
  
    useEffect(() => {
    }, [])

    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/admin" component={withAuth(Admin)}></Route>
                <Route path="/login" component={withAuthLogin(Login)}></Route>
            </Switch>
        </BrowserRouter>

    );
}

export default App;
{/* loading == true ? < div className='loading' >

            <BallBeat color={'#123abc'}
                loading={loading}/>
                </div > :
                   <BrowserRouter>
                    <Switch>
                    <Route exact path='/' render={(props) => <Index listSlider={listSlider}  listnews={listnews} />}/>
                   <Route  path="/news/:id" component={Pagenew}></Route>
                   <Route  path="/login" component={withAuthLogin(Login)}></Route>
                    <Route   path="/admin" component={withAuth(Admin)}></Route>
                    </Switch>
                  
                      
         
    </BrowserRouter>*/}