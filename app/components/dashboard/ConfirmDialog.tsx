import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface isAppProps {
  title: string;
  openConfirm: boolean;
  setOpenConfirm: () => void;
  btnConfirm: () => void;
}

const ConfirmDialog = ({ title, openConfirm, setOpenConfirm, btnConfirm }: isAppProps) => {
  return (
    <Dialog open={openConfirm} onOpenChange={setOpenConfirm}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={setOpenConfirm}>
            Hủy
          </Button>
          <Button variant="destructive" onClick={btnConfirm}>
            Xác nhận
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmDialog;
