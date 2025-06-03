import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function UserPhotos() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newComment, setNewComment] = useState('');
  const [commentingPhotoId, setCommentingPhotoId] = useState(null);
  const { userId } = useParams();

  useEffect(() => {
    const fetchUserPhotos = async () => {
      try {
        const response = await fetch(`http://localhost:3001/photos/user/${userId}`, {
          credentials: 'include'
        });

        if (!response.ok) {
          throw new Error('Cannot load data');
        }

        const data = await response.json();
        setUserData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserPhotos();
  }, [userId]);

  const handleCommentSubmit = async (photoId) => {
    if (!newComment.trim()) {
      alert('Please enter content');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3001/commentsOfPhoto/${photoId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        credentials: 'include',
        body: JSON.stringify({ comment: newComment })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Cannot send comment');
      }

      const result = await response.json(); 
      console.log('Server response:', result);
      console.log('Comment user data:', result.comment.user);
      const newCommentObj = {
        _id: result.comment._id,
        date_time: result.comment.date_time,
        comment: result.comment.comment,
        user: result.comment.user
      };
      console.log('New comment object:', newCommentObj);
  
      setUserData((prevData) => ({
        ...prevData,
        photos: prevData.photos.map(photo => {
          if (photo._id === photoId) {
            return {
              ...photo,
              comments: [newCommentObj, ...photo.comments]
            };
          }
          return photo;
        })
      }));
      
      setNewComment('');
      setCommentingPhotoId(null);
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!userData) return <div>Cannot find data</div>;

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>
        {userData.user.first_name} {userData.user.last_name}'s photos
      </h2>
      
      {userData.photos.length === 0 ? (
        <p>No photo to show</p>
      ) : (
        <div style={photosFlexStyle}>
          {userData.photos.map((photo) => (
            <div key={photo._id} style={photoCardStyle}>
              <div style={imageContainerStyle}>
                <img 
                  src={photo.url}
                  alt="User"
                  style={imageStyle}
                />
              </div>
              <div style={commentsContainerStyle}>
                <h3>Comments ({photo.comments.length})</h3>
                {photo.comments.map((comment) => (
                  <div key={comment._id} style={commentStyle}>
                    <div style={commentHeaderStyle}>
                      <strong>{comment.user.first_name} {comment.user.last_name}</strong>
                      <span style={dateStyle}>
                        {new Date(comment.date_time).toLocaleString()}
                      </span>
                    </div>
                    <p style={commentTextStyle}>{comment.comment}</p>
                  </div>
                ))}
                
                <div style={commentFormStyle}>
                  <textarea
                    value={commentingPhotoId === photo._id ? newComment : ''}
                    onChange={(e) => {
                      setNewComment(e.target.value);
                      setCommentingPhotoId(photo._id);
                    }}
                    placeholder="Comment..."
                    style={commentInputStyle}
                  />
                  <button
                    onClick={() => handleCommentSubmit(photo._id)}
                    style={commentButtonStyle}
                  >
                    Comment
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const containerStyle = {
  padding: '20px',
  maxWidth: '1200px',
  margin: '0 auto',
  marginTop: '60px'
};

const titleStyle = {
  textAlign: 'center',
  color: '#1976d2',
  marginBottom: '30px'
};

const photosFlexStyle = {
  display: 'flex',
  flexDirection: 'column',
  flexWrap: 'wrap',
  gap: '100px',
  padding: '20px'
};

const photoCardStyle = {
  border: '1px solid #ddd',
  borderRadius: '8px',
  overflow: 'hidden',
  backgroundColor: 'white',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
};

const imageStyle = {
  width: 'auto',
  height: '300px',
};

const commentsContainerStyle = {
  padding: '15px'
};

const commentStyle = {
  borderBottom: '1px solid #eee',
  padding: '10px 0',
  marginBottom: '10px'
};

const commentHeaderStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '5px'
};

const dateStyle = {
  color: '#666',
  fontSize: '0.8em'
};

const commentTextStyle = {
  margin: '0',
  color: '#333'
}; 

const imageContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '300px',
    width: '100%',
    overflow: 'hidden',
    borderRadius: '8px',
    backgroundColor: '#f0f0f0'
};

const commentFormStyle = {
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'row',
  gap: '10px',
  marginTop: '20px',
  borderTop: '1px solid #eee',
  paddingTop: '15px'
};

const commentInputStyle = {
    flex:1,
  minHeight: '80px',
  border: '1px solid #ddd',
  borderRadius: '4px',
  resize: 'vertical',
  fontFamily: 'inherit',
  fontSize: '14px'
};

const commentButtonStyle = {
    height: '20%',
  padding: '8px 16px',
  backgroundColor: '#1976d2',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '14px',
  float: 'right'
};
