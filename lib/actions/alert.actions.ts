'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import AlertModel from '@/database/models/alert.model';
import { getCurrentUser } from '@/lib/better-auth/session';

import { getStocksDetails } from './finnhub.actions';

export async function createAlert(alertData: AlertData) {
  try {
    const user = await getCurrentUser();
    if (!user) redirect('/sign-in');

    const newAlert = new AlertModel({
      ...alertData,
      symbol: alertData.symbol.toUpperCase(),
      userId: user.id,
      userEmail: user.email,
      threshold: parseFloat(alertData.threshold),
      isActive: true,
    });

    const data = await newAlert.save();
    revalidatePath('/watchlist');

    return {
      success: true,
      message: 'Alert created successfully',
      data: JSON.parse(JSON.stringify(data)),
    };
  } catch (error) {
    console.error('Error creating alert:', error);
    throw new Error('Failed to create alert');
  }
}

export async function updateAlert(alertId: string, alertData: AlertData) {
  try {
    const user = await getCurrentUser();
    if (!user) redirect('/sign-in');

    const itemToUpdate = {
      ...alertData,
      symbol: alertData.symbol.toUpperCase(),
      threshold: parseFloat(alertData.threshold),
    };

    const data = await AlertModel.updateOne(
      { _id: alertId, userId: user.id },
      { $set: itemToUpdate }
    );
    revalidatePath('/watchlist');

    return {
      success: true,
      message: 'Alert updated successfully',
      data: JSON.parse(JSON.stringify(data)),
    };
  } catch (error) {
    console.error('Error updating alert:', error);
    throw new Error('Failed to update alert');
  }
}

export async function deleteAlert(alertId: string) {
  try {
    const user = await getCurrentUser();
    if (!user) redirect('/sign-in');

    await AlertModel.deleteOne({ _id: alertId, userId: user.id });
    revalidatePath('/watchlist');

    return { success: true, message: 'Alert deleted successfully' };
  } catch (error) {
    console.error('Error deleting alert:', error);
    throw new Error('Failed to delete alert');
  }
}

export async function getUserAlerts(): Promise<Alert[]> {
  try {
    const user = await getCurrentUser();
    if (!user) redirect('/sign-in');

    const alerts = await AlertModel.find({
      userId: user.id,
      isActive: true,
    })
      .sort({ createdAt: -1 })
      .lean();

    if (alerts.length === 0) return [];

    return await Promise.all(
      alerts.map(async (alert) => {
        const stockData = await getStocksDetails(alert.symbol);
        return {
          id: String(alert._id),
          symbol: alert.symbol,
          company: alert.company,
          alertName: alert.alertName,
          currentPrice: stockData.currentPrice,
          alertType: alert.alertType,
          threshold: alert.threshold,
          changePercent: stockData.changePercent,
        };
      })
    );
  } catch (error) {
    console.error('Error fetching user alerts:', error);
    throw new Error('Failed to fetch user alerts');
  }
}
