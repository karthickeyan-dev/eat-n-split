import { useState } from 'react';

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
  const [friends, setFriends] = useState(initialFriends);
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [selectedFriend, SetSelectedFriend] = useState(null);

  const handleShowAddForm = function () {
    setShowAddFriend(show => !show);
    SetSelectedFriend(null);
  };

  const handleAddFriend = function (newFriend) {
    setFriends(friends => [...friends, newFriend]);
    setShowAddFriend(false);
  };

  const handleSelectedFriend = function (friend) {
    SetSelectedFriend(friend);
    setShowAddFriend(false);
  };

  const handleUpdateBalance = function (value) {
    setFriends(friends =>
      friends.map(friend =>
        friend.id === selectedFriend.id
          ? { ...friend, balance: friend.balance + value }
          : friend
      )
    );

    SetSelectedFriend(null);
  };

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList
          friends={friends}
          selectedFriend={selectedFriend}
          onSelectedFriend={handleSelectedFriend}
        />
        {showAddFriend && <FormAddFriend onAddFriend={handleAddFriend} />}
        <Button handleClick={handleShowAddForm}>
          {showAddFriend ? 'Close' : 'Add Friend'}
        </Button>
      </div>
      {selectedFriend && (
        <FormSplitBill
          selectedFriend={selectedFriend}
          onUpdateBalance={handleUpdateBalance}
        />
      )}
    </div>
  );
}

function Button({ children, handleClick }) {
  return (
    <button className="button" onClick={handleClick}>
      {children}
    </button>
  );
}

function FriendsList({ friends, selectedFriend, onSelectedFriend }) {
  // const friends = initialFriends;
  return (
    <ul>
      {friends.map(friend => (
        <Friend
          friend={friend}
          key={friend.id}
          selectedFriend={selectedFriend}
          onSelectedFriend={onSelectedFriend}
        />
      ))}
    </ul>
  );
}

function Friend({ friend, selectedFriend, onSelectedFriend }) {
  const isSelected = selectedFriend === friend;

  return (
    <li className={isSelected ? 'selected' : ''}>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>
      {friend.balance < 0 && (
        <p className="red">
          You owe {friend.name} {Math.abs(friend.balance)}
        </p>
      )}
      {friend.balance > 0 && (
        <p className="green">
          {friend.name} owes you {Math.abs(friend.balance)}
        </p>
      )}
      {friend.balance === 0 && <p>You and {friend.name} are even</p>}
      <Button handleClick={() => onSelectedFriend(isSelected ? null : friend)}>
        {isSelected ? 'Close' : 'Select'}
      </Button>
    </li>
  );
}

function FormAddFriend({ onAddFriend }) {
  const [name, setName] = useState('');
  const [image, setImage] = useState('https://i.pravatar.cc/48');

  const handleSubmit = function (e) {
    e.preventDefault();
    if (!name || !image) return;

    const id = crypto.randomUUID();
    const newFriend = {
      name,
      image: `${image}?=${id}`,
      id,
      balance: 0,
    };

    setName('');
    setImage('https://i.pravatar.cc/48');
    onAddFriend(newFriend);
  };

  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label>🧑‍🤝‍🧑 Name</label>
      <input
        type="text"
        value={name}
        onChange={e => setName(e.target.value)}
        required
      ></input>
      <label>🖼️ Image URL</label>
      <input
        type="text"
        value={image}
        onChange={e => setImage(e.target.value)}
        required
      ></input>
      <Button>Add Friend</Button>
    </form>
  );
}

function FormSplitBill({ selectedFriend, onUpdateBalance }) {
  const [bill, setBill] = useState(0);
  const [expense, setExpense] = useState(0);
  const [payee, setPayee] = useState('you');
  const friendExpense = bill - expense;

  const handleSplitBill = function (e) {
    e.preventDefault();

    if (!bill) return;

    onUpdateBalance(payee === 'you' ? friendExpense : -expense);
  };

  return (
    <form className="form-split-bill" onSubmit={handleSplitBill}>
      <h2>Split a Bill with {selectedFriend.name}</h2>
      <label>💵 Bill value</label>
      <input
        type="number"
        value={bill}
        onChange={e => setBill(Number(e.target.value))}
      ></input>
      <label>🧑‍🦰 Your expense</label>
      <input
        type="number"
        max={bill}
        value={expense}
        onChange={e => setExpense(Number(e.target.value))}
      ></input>
      <label>🧑‍🤝‍🧑 {selectedFriend.name}'s expense</label>
      <input type="number" value={friendExpense} disabled></input>
      <label>🤑 Who is paying the bill?</label>
      <select value={payee} onChange={e => setPayee(e.target.value)}>
        <option value="you">You</option>
        <option value="friend">{selectedFriend.name}</option>
      </select>
      <Button>Split bill</Button>
    </form>
  );
}
