import Player from '../../../../modules/game/Player';

const ItemBox = ({ player }: { player: Player }) => {
  return (
    <div className="absolute top-1 right-1 flex flex-row justify-around space-x-2">
      {Object.entries(player.itemState).map((item, i) => (
        <div
          key={i}
          className={`flex flex-col items-center justify-center text-[5px] w-10 h-10 ${
            item[1] > 0 ? 'bg-white' : 'bg-warmGray-400'
          }`}
        >
          <img src={`/assets/${item[0]}.png`} className="w-5 h-5" />
          <div>{item[1]}</div>
        </div>
      ))}
    </div>
  );
};

export default ItemBox;
