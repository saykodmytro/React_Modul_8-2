import Loader from 'components/Loader/Loader';
import React, { lazy, Suspense, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Link,
  NavLink,
  Route,
  Routes,
  useLocation,
  useParams,
} from 'react-router-dom';
import {
  fetchContacts,
  fetchPostDetails,
} from 'redux/postDetails/postDetails.reducer';
import {
  selectPostDetails,
  selectPostDetailsError,
  selectPostDetailsIsLoading,
} from 'redux/postDetails/postDetails.selector';

const PostsComments = lazy(() => import('pages/PostsComments'));

const PostDetails = () => {
  const { postId } = useParams();

  const location = useLocation();
  const backLinkRef = useRef(location.state?.from ?? '/');
  const dispatch = useDispatch();

  const postDetails = useSelector(selectPostDetails);
  const isLoading = useSelector(selectPostDetailsIsLoading);
  const error = useSelector(selectPostDetailsError);

  useEffect(() => {
    dispatch(fetchPostDetails(postId));
    dispatch(fetchContacts());
  }, [postId, dispatch]);

  return (
    <div>
      <h1>Post Details</h1>
      <Link to={backLinkRef.current}>Go back</Link>
      {error !== null && <p className="error-bage">{error}</p>}
      {isLoading && <Loader />}
      {postDetails !== null && (
        <div>
          <h2>{postDetails.title}</h2>
          <h3>PostId: {postDetails.id}</h3>
          <code>{postDetails.body}</code>
        </div>
      )}
      <div>
        <NavLink className="header-link" to="comments">
          Comments eee
        </NavLink>
      </div>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="comments" element={<PostsComments />} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default PostDetails;
