import { auth } from '../firebase';

function Header() {
  const user = auth.currentUser || {
    displayName: 'Guest User',
    photoURL: 'https://via.placeholder.com/40', // Placeholder image for guest user
  };

  return (
    <div className="bg-blue-500 p-4 text-white">
      <div className="flex justify-between items-center">
        <div className="text-xl">Business Management</div>
        <div className="relative">
          <img 
            src={user.photoURL} 
            alt={user.displayName} 
            className="w-10 h-10 rounded-full"
          />
          <div className="absolute right-0 mt-2 bg-white text-black rounded shadow-lg">
            {auth.currentUser ? (
              <button className="block px-4 py-2" onClick={() => auth.signOut()}>Sign Out</button>
            ) : (
              <span className="block px-4 py-2">Sign In</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
