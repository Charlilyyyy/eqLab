'use client';

import { Pen, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';

import { AlertModal } from '@/components/AlertModal';
import { Button } from '@/components/ui/button';
import { deleteAlert } from '@/lib/actions/alert.actions';
import {
  formatChangePercent,
  formatPrice,
  getAlertText,
  getChangeColorClass,
} from '@/lib/utils';

export function AlertList({ alertData = [] }: AlertsListProps) {
  const [alerts, setAlerts] = useState<Alert[]>(alertData);
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setAlerts(alertData);
  }, [alertData]);

  const handleDelete = async (alertId: string) => {
    const result = await deleteAlert(alertId);

    if (result?.success) {
      setAlerts((prev) => prev.filter((item) => item.id !== alertId));
      setSelectedAlert(null);
    }
  };

  return (
    <>
      <ul className="alert-list scrollbar-hide-default">
        {alerts.length === 0 && (
          <p className="alert-empty">No alerts added yet.</p>
        )}

        {alerts.map((alert) => (
          <li key={alert.id} className="alert-item">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="alert-name">{alert.alertName}</h3>

                <div className="alert-details">
                  <div className="space-y-1">
                    <p className="alert-company">{alert.company}</p>
                    <div className="alert-price">
                      {formatPrice(alert.currentPrice)}
                    </div>
                  </div>

                  <div className="space-y-1 text-right">
                    <p className="text-sm text-gray-400">{alert.symbol}</p>
                    <div
                      className={`text-sm ${getChangeColorClass(
                        alert.changePercent
                      )}`}
                    >
                      {formatChangePercent(alert.changePercent)}
                    </div>
                  </div>
                </div>

                <div className="alert-actions">
                  <div>
                    <div className="mb-1 text-sm text-gray-500">Alert at:</div>
                    <span
                      className={`font-medium capitalize ${
                        alert.alertType === 'upper'
                          ? 'text-green-400'
                          : 'text-red-400'
                      }`}
                    >
                      {getAlertText(alert)}
                    </span>
                  </div>

                  <div className="flex">
                    <Button
                      onClick={() => {
                        setSelectedAlert(alert);
                        setOpen(true);
                      }}
                      className="alert-update-btn"
                    >
                      <Pen className="h-4 w-4" />
                    </Button>

                    <Button
                      onClick={() => handleDelete(alert.id)}
                      className="alert-delete-btn"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {selectedAlert && open && (
        <AlertModal
          alertId={selectedAlert.id}
          open={open}
          setOpen={setOpen}
          alertData={{
            symbol: selectedAlert.symbol,
            company: selectedAlert.company,
            alertName: selectedAlert.alertName,
            alertType: selectedAlert.alertType,
            threshold: selectedAlert.threshold.toString(),
          }}
          action="update"
        />
      )}
    </>
  );
}
