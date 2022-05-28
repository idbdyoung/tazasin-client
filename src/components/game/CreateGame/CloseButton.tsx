import { useModal } from '../../../modules/Modal';
import Close from '../../svgs/Close';

const CloseButton: React.FC = () => {
  const modal = useModal();

  return (
    <div className="absolute -top-7 right-0 cursor-pointer" onClick={() => modal.close()}>
      <Close stroke="white" />
    </div>
  );
};

export default CloseButton;
