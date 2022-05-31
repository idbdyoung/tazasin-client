import Session from '../../modules/game/Session';

interface UserCardProps {
  color?: string;
  user?: User;
}

const UserCard = ({ color, user }: UserCardProps) => {
  return (
    <div className="flex justify-center items-center flex-1 h-[100px] rounded-xl border border-white my-2 px-2 space-x-2">
      <div
        style={{ background: color ?? '#525255' }}
        className={`flex justify-center items-center h-3/4 aspect-square rounded-full text-sm text-primary-gray`}
      >
        {user ? user.name : ''}
      </div>
      {/* {user && (
        <div className="flex flex-col">
          <div>레벨 : {user.level}</div>
          <div>승리 게임 : {user.winGame}</div>
          <div>전체 플레이 게임 : {user.totalGame}</div>
        </div>
      )} */}
    </div>
  );
};

export default UserCard;
