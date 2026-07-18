'use client';

import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { InputField } from '@/components/InputField';
import { SelectField } from '@/components/SelectField';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { createAlert, updateAlert } from '@/lib/actions/alert.actions';
import { ALERT_TYPE_OPTIONS } from '@/lib/constants';

export function AlertModal({
  alertId,
  action = 'create',
  alertData,
  open,
  setOpen,
}: AlertModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<AlertData>({
    defaultValues: {
      symbol: alertData?.symbol || '',
      company: alertData?.company || '',
      alertName: alertData?.alertName || '',
      alertType: alertData?.alertType || 'upper',
      threshold: alertData?.threshold || '',
    },
  });

  const onSubmit = async (data: AlertData) => {
    try {
      const payload: AlertData = {
        symbol: data.symbol.toUpperCase(),
        company: data.company,
        alertName: data.alertName,
        alertType: data.alertType,
        threshold: data.threshold,
      };

      const result =
        action === 'update' && alertId
          ? await updateAlert(alertId, payload)
          : await createAlert(payload);

      if (result.success) {
        setOpen(false);
        reset();
        toast.success(`Alert ${action === 'update' ? 'updated' : 'created'}!`);
      }
    } catch {
      toast.error(`Failed to ${action} alert. Try again.`);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="alert-dialog">
        <DialogHeader>
          <DialogTitle className="alert-title">
            {action === 'update' ? 'Update alert' : 'Add alert'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <InputField
            name="alertName"
            label="Alert name"
            placeholder="Ex: Apple price alert"
            register={register}
            error={errors.alertName}
            validation={{ required: 'Alert name is required' }}
          />

          <div className="cursor-not-allowed">
            <InputField
              name="stockIdentifier"
              label="Stock identifier"
              value={`${alertData?.company} (${alertData?.symbol})`}
              disabled
              register={register}
              placeholder=""
            />
          </div>

          <SelectField
            name="alertType"
            label="Alert type"
            placeholder="Select alert type"
            options={ALERT_TYPE_OPTIONS}
            control={control}
            error={errors.alertType}
            required
          />

          <InputField
            name="threshold"
            label="Threshold value"
            placeholder={alertData?.threshold?.toString() || '0.00'}
            register={register}
            error={errors.threshold}
            validation={{ required: 'Threshold value is required' }}
          />

          <Button
            type="submit"
            disabled={isSubmitting}
            className="yellow-btn mt-5 w-full"
          >
            {isSubmitting
              ? `${action === 'update' ? 'Updating' : 'Creating'}...`
              : `${action === 'update' ? 'Update' : 'Create'} alert`}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
