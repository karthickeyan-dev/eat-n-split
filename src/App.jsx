const initialFriends = [
  {
    id: 118836,
    name: 'Clark',
    image: 'https://i.pravatar.cc/48?u=118836',
    balance: -7,
  },
  {
    id: 933372,
    name: 'Sarah',
    image: 'https://i.pravatar.cc/48?u=933372',
    balance: 20,
  },
  {
    id: 499476,
    name: 'Anthony',
    image: 'https://i.pravatar.cc/48?u=499476',
    balance: 0,
  },
];

export default function App() {
  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList />
        <FormAddFriend />
        <Button>Add Friend</Button>
      </div>
      <FormSplitBill />
    </div>
  );
}

function Button({ children }) {
  return <button className="button">{children}</button>;
}

function FriendsList() {
  const friends = initialFriends;
  return (
    <ul>
      {friends.map(friend => (
        <Friend
          name={friend.name}
          image={friend.image}
          balance={friend.balance}
          key={friend.id}
        />
      ))}
    </ul>
  );
}

function Friend({ name, image, balance }) {
  return (
    <li>
      <img src={image} alt={name} />
      <h3>{name}</h3>
      {balance < 0 && (
        <p className="red">
          You owe {name} {Math.abs(balance)}
        </p>
      )}
      {balance > 0 && (
        <p className="green">
          {name} owes you {Math.abs(balance)}
        </p>
      )}
      {balance === 0 && <p>You and {name} are even</p>}
      <Button>Select</Button>
    </li>
  );
}

function FormAddFriend() {
  return (
    <form className="form-add-friend">
      <label>🧑‍🤝‍🧑 Name</label>
      <input type="text"></input>
      <label>🖼️ Image URL</label>
      <input type="text"></input>
      <Button>Add Friend</Button>
    </form>
  );
}

function FormSplitBill() {
  return (
    <form className="form-split-bill">
      <h2>Split a Bill with X</h2>
      <label>💵 Bill value</label>
      <input type="number"></input>
      <label>🧑‍🦰 Your expense</label>
      <input type="number"></input>
      <label>🧑‍🤝‍🧑 X's expense</label>
      <input type="number" disabled></input>
      <label>🤑 Who is paying the bill?</label>
      <select>
        <option>You</option>
        <option>X</option>
      </select>
      <Button>Split bill</Button>
    </form>
  );
}
