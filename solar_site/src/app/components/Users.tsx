import User from './User';

const Users = ({ users }: { users: any[] }) => (
  <div>
    {users.map((user) => (
      <User key={user.id} user={user} />
    ))}
  </div>
);

export default Users;
