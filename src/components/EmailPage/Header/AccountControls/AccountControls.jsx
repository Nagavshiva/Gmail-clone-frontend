import { useNavigate} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutAction } from '../../../../redux/actions/accountActions';
import styles from './styles/AccountControls.module.css';
import { Avatar, Badge, Button } from '@material-ui/core';

export default function AccountControls({ user, toggleShowEditImage, toggleShowProfile }) {
  const dispatch = useDispatch();
  const navigate= useNavigate();

  return (
    <div className={styles.container}>
      <Badge
        badgeContent='edit'
        color='secondary'
        overlap='circular'
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        style={{ cursor: 'pointer' }}
        onClick={() => {
          toggleShowEditImage();
          toggleShowProfile();
        }}>
        <Avatar className={styles.avatar} src={user.profilePicture} />
      </Badge>

      <p>
        {user.name.first} {user.name.last}
        <br />
        {user.email}
      </p>

      <Button onClick={() => navigate('/GitHub')}>Visit my GitHub page</Button>
      <Button onClick={() => dispatch(logoutAction())}>Logout</Button>
    </div>
  );
}