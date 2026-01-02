import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Clock, CheckCircle2, XCircle, MapPin, User, Navigation, Phone, DollarSign } from 'lucide-react-native';

export const RidesList = () => {
  const [activeTab, setActiveTab] = useState('ongoing');

  const rides:any = {
    ongoing: [
      {
        id: 1,
        customerName: 'Sarah Johnson',
        customerPhone: '+1 234-567-8900',
        customerRating: 4.8,
        from: 'Downtown Plaza, 123 Main St',
        to: 'Airport Terminal 3',
        distance: '12.5 km',
        pickupTime: 'Today, 2:30 PM',
        fare: '$45.00',
        paymentMethod: 'Card',
        status: 'Arriving at Pickup'
      },
      {
        id: 2,
        customerName: 'Mike Chen',
        customerPhone: '+1 234-567-8901',
        customerRating: 5.0,
        from: 'Central Station, Platform 2',
        to: 'Business District, Tower A',
        distance: '8.3 km',
        pickupTime: 'Today, 4:15 PM',
        fare: '$28.50',
        paymentMethod: 'Cash',
        status: 'Scheduled'
      }
    ],
    completed: [
      {
        id: 3,
        customerName: 'Emma Davis',
        customerRating: 4.5,
        from: '45 Oak Street',
        to: 'Shopping Mall, Gate 3',
        distance: '10.2 km',
        completedTime: 'Dec 15, 10:00 AM',
        fare: '$32.00',
        tip: '$5.00',
        paymentMethod: 'Card',
        yourRating: 5
      },
      {
        id: 4,
        customerName: 'David Wilson',
        customerRating: 4.9,
        from: 'Office Building, 5th Ave',
        to: 'Restaurant Downtown',
        distance: '6.8 km',
        completedTime: 'Dec 14, 7:30 PM',
        fare: '$25.00',
        tip: '$3.00',
        paymentMethod: 'Cash',
        yourRating: 5
      }
    ],
    cancelled: [
      {
        id: 6,
        customerName: 'John Smith',
        from: 'City Center',
        to: 'Suburban Area',
        cancelledTime: 'Dec 12, 3:45 PM',
        reason: 'Customer cancelled',
        cancellationFee: '$5.00'
      },
      {
        id: 7,
        customerName: 'Mary Johnson',
        from: 'Train Station',
        to: 'University Campus',
        cancelledTime: 'Dec 10, 11:20 AM',
        reason: 'Customer no-show',
        cancellationFee: '$8.00'
      }
    ]
  };

  const tabs = [
    { id: 'ongoing', label: 'Active', icon: Clock, count: rides.ongoing.length },
    { id: 'completed', label: 'Completed', icon: CheckCircle2, count: rides.completed.length },
    { id: 'cancelled', label: 'Cancelled', icon: XCircle, count: rides.cancelled.length }
  ];

  const handleCall = (phone: string) => {
    Linking.openURL(`tel:${phone}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Rides</Text>
        <Text style={styles.headerSubtitle}>Manage your pickup and delivery tasks</Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <TouchableOpacity
              key={tab.id}
              onPress={() => setActiveTab(tab.id)}
              style={[styles.tab, isActive && styles.tabActive]}
            >
              <Text style={[styles.tabText, isActive && styles.tabTextActive]}>
                {tab.label}
              </Text>
              <View style={[styles.badge, isActive && styles.badgeActive]}>
                <Text style={[styles.badgeText, isActive && styles.badgeTextActive]}>
                  {tab.count}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Rides List */}
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {activeTab === 'ongoing' && rides.ongoing.map((ride:any) => (
          <View key={ride.id} style={styles.card}>
            {/* Status and Fare */}
            <View style={styles.cardHeader}>
              <View style={styles.statusBadge}>
                <Navigation size={14} color="#059669" />
                <Text style={styles.statusText}>{ride.status}</Text>
              </View>
              <Text style={styles.fareText}>{ride.fare}</Text>
            </View>

            {/* Customer Info */}
            <View style={styles.customerContainer}>
              <View style={styles.customerInfo}>
                <View style={styles.avatar}>
                  <User size={24} color="#059669" />
                </View>
                <View>
                  <Text style={styles.customerName}>{ride.customerName}</Text>
                  <View style={styles.ratingContainer}>
                    <Text style={styles.star}>★</Text>
                    <Text style={styles.ratingText}>{ride.customerRating}</Text>
                  </View>
                </View>
              </View>
              <TouchableOpacity
                style={styles.phoneButton}
                onPress={() => handleCall(ride.customerPhone)}
              >
                <Phone size={20} color="#059669" />
              </TouchableOpacity>
            </View>

            {/* Route */}
            <View style={styles.routeContainer}>
              <View style={styles.routeItem}>
                <View style={styles.pickupDot} />
                <View style={styles.routeDetails}>
                  <Text style={styles.routeLabel}>PICKUP LOCATION</Text>
                  <Text style={styles.routeAddress}>{ride.from}</Text>
                  <Text style={styles.pickupTime}>{ride.pickupTime}</Text>
                </View>
              </View>

              <View style={styles.routeLine} />

              <View style={styles.routeItem}>
                <MapPin size={18} color="#3B82F6" />
                <View style={styles.routeDetails}>
                  <Text style={styles.routeLabel}>DROP-OFF LOCATION</Text>
                  <Text style={styles.routeAddress}>{ride.to}</Text>
                </View>
              </View>
            </View>

            {/* Trip Details */}
            <View style={styles.tripDetails}>
              <View style={styles.tripInfo}>
                <View style={styles.distanceContainer}>
                  <Navigation size={16} color="#6B7280" />
                  <Text style={styles.distanceText}>{ride.distance}</Text>
                </View>
                <View style={[
                  styles.paymentBadge,
                  ride.paymentMethod === 'Cash' ? styles.cashBadge : styles.cardBadge
                ]}>
                  <Text style={[
                    styles.paymentText,
                    ride.paymentMethod === 'Cash' ? styles.cashText : styles.cardText
                  ]}>
                    {ride.paymentMethod}
                  </Text>
                </View>
              </View>
              <TouchableOpacity style={styles.navigateButton}>
                <Text style={styles.navigateButtonText}>Navigate</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}

        {activeTab === 'completed' && rides.completed.map((ride:any) => (
          <View key={ride.id} style={styles.card}>
            {/* Customer Info */}
            <View style={styles.completedHeader}>
              <View style={styles.completedCustomer}>
                <View style={styles.avatarSmall}>
                  <User size={20} color="#6B7280" />
                </View>
                <View>
                  <Text style={styles.customerName}>{ride.customerName}</Text>
                  <View style={styles.ratingContainer}>
                    <Text style={styles.starSmall}>★</Text>
                    <Text style={styles.ratingTextSmall}>{ride.customerRating}</Text>
                  </View>
                </View>
              </View>
              <View style={styles.earningsContainer}>
                <Text style={styles.fareTextBold}>{ride.fare}</Text>
                {ride.tip && (
                  <Text style={styles.tipText}>+{ride.tip} tip</Text>
                )}
              </View>
            </View>

            {/* Route */}
            <View style={styles.completedRoute}>
              <View style={styles.completedRouteItem}>
                <View style={styles.completedDot} />
                <Text style={styles.completedAddress}>{ride.from}</Text>
              </View>
              <View style={styles.completedRouteLine} />
              <View style={styles.completedRouteItem}>
                <CheckCircle2 size={14} color="#10B981" />
                <Text style={styles.completedAddress}>{ride.to}</Text>
              </View>
            </View>

            {/* Details */}
            <View style={styles.completedDetails}>
              <Text style={styles.completedTime}>{ride.completedTime}</Text>
              <Text style={styles.dot}>•</Text>
              <Text style={styles.completedDistance}>{ride.distance}</Text>
              <Text style={styles.dot}>•</Text>
              <View style={[
                styles.paymentBadgeSmall,
                ride.paymentMethod === 'Cash' ? styles.cashBadge : styles.cardBadge
              ]}>
                <Text style={[
                  styles.paymentTextSmall,
                  ride.paymentMethod === 'Cash' ? styles.cashText : styles.cardText
                ]}>
                  {ride.paymentMethod}
                </Text>
              </View>
            </View>

            {/* Rating */}
            <View style={styles.ratingSection}>
              <Text style={styles.ratingLabel}>Customer rated you:</Text>
              <View style={styles.stars}>
                {[...Array(5)].map((_, i) => (
                  <Text
                    key={i}
                    style={i < ride.yourRating ? styles.starFilled : styles.starEmpty}
                  >
                    ★
                  </Text>
                ))}
              </View>
            </View>
          </View>
        ))}

        {activeTab === 'cancelled' && rides.cancelled.map((ride:any) => (
          <View key={ride.id} style={styles.card}>
            {/* Header */}
            <View style={styles.cardHeader}>
              <View style={styles.cancelledBadge}>
                <Text style={styles.cancelledText}>Cancelled</Text>
              </View>
              {ride.cancellationFee && (
                <Text style={styles.fareTextBold}>{ride.cancellationFee}</Text>
              )}
            </View>

            {/* Customer Info */}
            <View style={styles.cancelledCustomer}>
              <View style={styles.avatarSmall}>
                <User size={20} color="#6B7280" />
              </View>
              <Text style={styles.customerName}>{ride.customerName}</Text>
            </View>

            {/* Route */}
            <View style={styles.completedRoute}>
              <View style={styles.completedRouteItem}>
                <View style={styles.cancelledDot} />
                <Text style={styles.completedAddress}>{ride.from}</Text>
              </View>
              <View style={styles.completedRouteLine} />
              <View style={styles.completedRouteItem}>
                <XCircle size={14} color="#EF4444" />
                <Text style={styles.completedAddress}>{ride.to}</Text>
              </View>
            </View>

            <Text style={styles.cancelledTime}>{ride.cancelledTime}</Text>

            {/* Reason */}
            <View style={styles.reasonContainer}>
              <Text style={styles.reasonText}>{ride.reason}</Text>
              {ride.cancellationFee && (
                <Text style={styles.feeAppliedText}>Cancellation fee applied</Text>
              )}
            </View>
          </View>
        ))}

        {rides[activeTab].length === 0 && (
          <View style={styles.emptyState}>
            <View style={styles.emptyIconContainer}>
              {activeTab === 'ongoing' && <Clock size={32} color="#9CA3AF" />}
              {activeTab === 'completed' && <CheckCircle2 size={32} color="#9CA3AF" />}
              {activeTab === 'cancelled' && <XCircle size={32} color="#9CA3AF" />}
            </View>
            <Text style={styles.emptyTitle}>No {activeTab} rides</Text>
            <Text style={styles.emptySubtitle}>You don't have any {activeTab} rides yet</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    margin: 16,
    padding: 4,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 12,
    gap: 6,
  },
  tabActive: {
    backgroundColor: '#059669',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  tabTextActive: {
    color: '#fff',
  },
  badge: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  badgeActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#6B7280',
  },
  badgeTextActive: {
    color: '#fff',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#D1FAE5',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#D1FAE5',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#059669',
  },
  fareText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#059669',
  },
  fareTextBold: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
  },
  customerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  customerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  avatarSmall: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  customerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
  },
  star: {
    fontSize: 14,
    color: '#FBBF24',
  },
  starSmall: {
    fontSize: 12,
    color: '#FBBF24',
  },
  ratingText: {
    fontSize: 14,
    color: '#6B7280',
  },
  ratingTextSmall: {
    fontSize: 12,
    color: '#6B7280',
  },
  phoneButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  routeContainer: {
    marginBottom: 16,
  },
  routeItem: {
    flexDirection: 'row',
    gap: 12,
  },
  pickupDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#059669',
    marginTop: 4,
  },
  routeDetails: {
    flex: 1,
  },
  routeLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#6B7280',
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  routeAddress: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111827',
  },
  pickupTime: {
    fontSize: 13,
    color: '#059669',
    marginTop: 4,
    fontWeight: '500',
  },
  routeLine: {
    width: 2,
    height: 32,
    backgroundColor: '#E5E7EB',
    marginLeft: 7,
    marginVertical: 4,
    borderStyle: 'dashed',
  },
  tripDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  tripInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  distanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  distanceText: {
    fontSize: 14,
    color: '#6B7280',
  },
  paymentBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  paymentBadgeSmall: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  cashBadge: {
    backgroundColor: '#D1FAE5',
  },
  cardBadge: {
    backgroundColor: '#DBEAFE',
  },
  paymentText: {
    fontSize: 12,
    fontWeight: '700',
  },
  paymentTextSmall: {
    fontSize: 11,
    fontWeight: '700',
  },
  cashText: {
    color: '#059669',
  },
  cardText: {
    color: '#2563EB',
  },
  navigateButton: {
    backgroundColor: '#059669',
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 10,
  },
  navigateButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },
  completedHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  completedCustomer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  earningsContainer: {
    alignItems: 'flex-end',
  },
  tipText: {
    fontSize: 13,
    color: '#059669',
    fontWeight: '700',
    marginTop: 2,
  },
  completedRoute: {
    marginBottom: 12,
  },
  completedRouteItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  completedDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#9CA3AF',
    marginTop: 4,
  },
  completedAddress: {
    fontSize: 14,
    color: '#111827',
    flex: 1,
  },
  completedRouteLine: {
    width: 2,
    height: 16,
    backgroundColor: '#E5E7EB',
    marginLeft: 4,
    marginVertical: 2,
    borderStyle: 'dashed',
  },
  completedDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  completedTime: {
    fontSize: 13,
    color: '#6B7280',
  },
  completedDistance: {
    fontSize: 13,
    color: '#6B7280',
  },
  dot: {
    fontSize: 13,
    color: '#D1D5DB',
  },
  ratingSection: {
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  ratingLabel: {
    fontSize: 11,
    color: '#6B7280',
    marginBottom: 8,
  },
  stars: {
    flexDirection: 'row',
    gap: 4,
  },
  starFilled: {
    fontSize: 18,
    color: '#FBBF24',
  },
  starEmpty: {
    fontSize: 18,
    color: '#E5E7EB',
  },
  cancelledBadge: {
    backgroundColor: '#FEE2E2',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
  },
  cancelledText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#DC2626',
  },
  cancelledCustomer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  cancelledDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#D1D5DB',
    marginTop: 4,
  },
  cancelledTime: {
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 12,
  },
  reasonContainer: {
    backgroundColor: '#FEE2E2',
    borderWidth: 1,
    borderColor: '#FECACA',
    borderRadius: 8,
    padding: 12,
  },
  reasonText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#DC2626',
  },
  feeAppliedText: {
    fontSize: 11,
    color: '#DC2626',
    marginTop: 4,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 64,
  },
  emptyIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
});