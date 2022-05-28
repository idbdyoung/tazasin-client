import Player from '../../../../../modules/game/Player';
import { useGame } from '../../../../../modules/game/Provider';

import SkillButton from './SkillButton';

const SkillBox = ({ currentPlayer }: { currentPlayer: Player }) => {
  const { players } = useGame();

  return (
    <div className="w-full flex flex-row p-1 justify-around">
      {players.map(
        player =>
          player.isMe &&
          (player.id === currentPlayer.id ? (
            <SkillButton
              key={player.id}
              type="default"
              useable={player.itemState.default > 0}
              user={player}
              target={player}
            />
          ) : (
            Object.entries(player.itemState).map(
              (item, i) =>
                item[0] !== 'default' && (
                  <SkillButton
                    key={i}
                    type={item[0] as SkillEffect}
                    useable={item[1] > 0}
                    user={player}
                    target={currentPlayer}
                  />
                )
            )
          ))
      )}
    </div>
  );
};

export default SkillBox;
