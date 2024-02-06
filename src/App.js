import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AboutUs from "./components/AboutUs";
import Home from "./components/Home";
import Login from "./components/Login";
import NewPost from "./components/NewPost";
import OurCats from "./components/OurCats";
import Kittens from "./components/Kittens";
import PostPage from "./components/PostPage";
import PrivateRoute from "./components/PrivateRoute";
import NewFriend from "./components/NewFriend";
import ForgottenPassword from "./components/ForgottenPassword";
import PostsPage from "./components/PostsPage";
import EditFriend from "./components/EditFriend";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/our-friends" element={<OurCats collectionName={"friends"}/>} />
        <Route path="/kittens" element={<Kittens collectionName={"kittens"}/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgottenPassword />} />
        <Route path="/new-post" element={
          <PrivateRoute><NewPost/></PrivateRoute>
        }/>
        <Route path="/new-friend" element={
          <PrivateRoute><NewFriend collectionName={'friends'}/></PrivateRoute>
        }/>
        <Route path="/edit-friend/:editId" element={
          <PrivateRoute><EditFriend collectionName={'friends'}/></PrivateRoute>
        }/>
        <Route path="/new-kitten" element={
          <PrivateRoute><NewFriend collectionName={'kittens'}/></PrivateRoute>
        }/>
        <Route path="/posts/:postId" element={<PostPage />}/>
        <Route exact path="/posts/" element={<PostsPage />}/>
      </Routes>
    </Router>
  );
}

export default App;
