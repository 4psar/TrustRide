import { StyleSheet, Text, View, Switch, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { 
  User, 
  Car, 
  Clock, 
  Star, 
  IndianRupee, 
  Settings, 
  BarChart3, 
  ChevronRight,
  Calendar,
  Navigation,
  ShieldCheck
} from 'lucide-react-native';

export const DriverDashboard = () => {
  const [isOnline, setIsOnline] = useState(true);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Good morning,</Text>
            <Text style={styles.userName}>Yuvaraja</Text>
            <Text style={styles.driverId}>Driver ID: DRI78945</Text>
          </View>
          <TouchableOpacity style={styles.profileContainer}>
            <View style={styles.profileImage}>
              <Text style={styles.profileInitial}>YR</Text>
              <View style={[styles.onlineBadge, isOnline ? styles.onlineBadgeActive : styles.onlineBadgeInactive]} />
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.statusCard}>
          <View style={styles.statusHeader}>
            <View style={styles.statusLeft}>
              <View style={[styles.statusIndicator, isOnline ? styles.online : styles.offline]} />
              <View>
                <Text style={styles.statusText}>{isOnline ? 'Available for rides' : 'Currently offline'}</Text>
                <Text style={styles.statusSubText}>{isOnline ? 'You\'ll receive ride requests' : 'Turn on to receive rides'}</Text>
              </View>
            </View>
            <Switch
              value={isOnline}
              onValueChange={() => setIsOnline(!isOnline)}
              thumbColor="#fff"
              trackColor={{ true: "#4CAF50", false: "#9E9E9E" }}
              ios_backgroundColor="#9E9E9E"
              style={styles.switch}
            />
          </View>
          {isOnline && (
            <View style={styles.activeInfo}>
              <Clock size={16} color="#4CAF50" />
              <Text style={styles.activeTime}>Active for 2h 30m</Text>
              <View style={styles.divider} />
              <Car size={16} color="#4CAF50" />
              <Text style={styles.activeTime}>18 rides completed</Text>
            </View>
          )}
        </View>

        <View style={styles.earningsDashboard}>
          <Text style={styles.sectionTitle}>Today's Summary</Text>
          <View style={styles.earningsCard}>
            <View style={styles.earningsHeader}>
              <View>
                <Text style={styles.earningsLabel}>Total Earnings</Text>
                <Text style={styles.earningsAmount}>₹2,850</Text>
              </View>
              <View style={styles.currencyIcon}>
                <IndianRupee size={32} color="#fff" />
              </View>
            </View>
            
            <View style={styles.statsGrid}>
              <View style={styles.statItem}>
                <View style={styles.statIconContainer}>
                  <Car size={18} color="#fff" />
                </View>
                <Text style={styles.statValue}>18</Text>
                <Text style={styles.statLabel}>Rides</Text>
              </View>
              
              <View style={styles.statItem}>
                <View style={styles.statIconContainer}>
                  <Clock size={18} color="#fff" />
                </View>
                <Text style={styles.statValue}>6.5h</Text>
                <Text style={styles.statLabel}>Online</Text>
              </View>
              
              <View style={styles.statItem}>
                <View style={styles.statIconContainer}>
                  <Star size={18} color="#fff" fill="#fff" />
                </View>
                <Text style={styles.statValue}>4.9</Text>
                <Text style={styles.statLabel}>Rating</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.quickStats}>
          <View style={styles.statCard}>
            <View style={[styles.statCardIcon, { backgroundColor: '#E3F2FD' }]}>
              <IndianRupee size={22} color="#2196F3" />
            </View>
            <Text style={styles.statCardValue}>₹156.50/hr</Text>
            <Text style={styles.statCardLabel}>Avg. Hourly</Text>
          </View>
          
          <View style={styles.statCard}>
            <View style={[styles.statCardIcon, { backgroundColor: '#F3E5F5' }]}>
              <Navigation size={22} color="#9C27B0" />
            </View>
            <Text style={styles.statCardValue}>22 min</Text>
            <Text style={styles.statCardLabel}>Avg. Ride Time</Text>
          </View>

          <View style={styles.statCard}>
            <View style={[styles.statCardIcon, { backgroundColor: '#E8F5E9' }]}>
              <ShieldCheck size={22} color="#4CAF50" />
            </View>
            <Text style={styles.statCardValue}>98%</Text>
            <Text style={styles.statCardLabel}>Satisfaction</Text>
          </View>
        </View>

        <View style={styles.recentRidesSection}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleRow}>
              <Calendar size={20} color="#1A1A1A" />
              <Text style={styles.sectionTitle}>Recent Rides</Text>
            </View>
            <TouchableOpacity style={styles.seeAllButton}>
              <Text style={styles.seeAllText}>View All</Text>
              <ChevronRight size={16} color="#2196F3" />
            </TouchableOpacity>
          </View>

          <View style={styles.rideCard}>
            <View style={styles.rideIconContainer}>
              <Car size={20} color="#4CAF50" />
            </View>
            <View style={styles.rideInfo}>
              <View style={styles.rideHeader}>
                <Text style={styles.rideLocation}>Muthialpet → Chennai Central</Text>
                <Text style={styles.rideFare}>₹1,500</Text>
              </View>
              <View style={styles.rideDetails}>
                <View style={styles.rideDetailItem}>
                  <Clock size={14} color="#666" />
                  <Text style={styles.rideDetailText}>Yesterday, 2:00 PM</Text>
                </View>
                <View style={styles.rideDetailItem}>
                  <Car size={14} color="#666" />
                  <Text style={styles.rideDetailText}>12.5 km • 28 min</Text>
                </View>
              </View>
              <View style={styles.rideRating}>
                <Star size={14} color="#FFB300" fill="#FFB300" />
                <Text style={styles.ratingText}>5.0</Text>
              </View>
            </View>
          </View>

          <View style={styles.rideCard}>
            <View style={styles.rideIconContainer}>
              <Car size={20} color="#2196F3" />
            </View>
            <View style={styles.rideInfo}>
              <View style={styles.rideHeader}>
                <Text style={styles.rideLocation}>Airport → OMR</Text>
                <Text style={styles.rideFare}>₹800</Text>
              </View>
              <View style={styles.rideDetails}>
                <View style={styles.rideDetailItem}>
                  <Clock size={14} color="#666" />
                  <Text style={styles.rideDetailText}>Today, 8:30 AM</Text>
                </View>
                <View style={styles.rideDetailItem}>
                  <Car size={14} color="#666" />
                  <Text style={styles.rideDetailText}>8.2 km • 18 min</Text>
                </View>
              </View>
              <View style={styles.rideRating}>
                <Star size={14} color="#FFB300" fill="#FFB300" />
                <Text style={styles.ratingText}>4.5</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.actionButton}>
            <View style={[styles.actionIcon, { backgroundColor: '#E8F5E9' }]}>
              <Calendar size={24} color="#4CAF50" />
            </View>
            <Text style={styles.actionText}>Trip History</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton}>
            <View style={[styles.actionIcon, { backgroundColor: '#FFF3E0' }]}>
              <BarChart3 size={24} color="#FF9800" />
            </View>
            <Text style={styles.actionText}>Earnings</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton}>
            <View style={[styles.actionIcon, { backgroundColor: '#E3F2FD' }]}>
              <Settings size={24} color="#2196F3" />
            </View>
            <Text style={styles.actionText}>Settings</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  greeting: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'System',
    fontWeight: '500',
  },
  userName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1A1A1A',
    fontFamily: 'System',
    marginTop: 4,
  },
  driverId: {
    fontSize: 12,
    color: '#888',
    fontFamily: 'System',
    marginTop: 2,
    fontWeight: '500',
  },
  profileContainer: {
    alignItems: 'center',
  },
  profileImage: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#2196F3',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  profileInitial: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
  },
  onlineBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#fff',
  },
  onlineBadgeActive: {
    backgroundColor: '#4CAF50',
  },
  onlineBadgeInactive: {
    backgroundColor: '#9E9E9E',
  },
  
  statusCard: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  statusHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  statusLeft: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    flex: 1,
  },
  statusIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginTop: 4,
  },
  online: {
    backgroundColor: '#4CAF50',
  },
  offline: {
    backgroundColor: '#9E9E9E',
  },
  statusText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  statusSubText: {
    fontSize: 13,
    color: '#666',
    fontWeight: '400',
  },
  switch: {
    transform: [{ scaleX: 1.1 }, { scaleY: 1.1 }],
  },
  activeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: 'rgba(76, 175, 80, 0.08)',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    flexWrap: 'wrap',
  },
  activeTime: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: '500',
  },
  divider: {
    width: 1,
    height: 16,
    backgroundColor: 'rgba(76, 175, 80, 0.3)',
  },
  
  earningsDashboard: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 16,
    fontFamily: 'System',
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  earningsCard: {
    backgroundColor: '#2196F3',
    borderRadius: 20,
    padding: 24,
    shadowColor: '#2196F3',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
  },
  earningsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  earningsLabel: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
  },
  earningsAmount: {
    color: '#fff',
    fontSize: 36,
    fontWeight: '700',
    fontFamily: 'System',
  },
  currencyIcon: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
  },
  statIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statValue: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 2,
  },
  statLabel: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 12,
    fontWeight: '500',
  },
  
  quickStats: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 12,
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  statCardIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  statCardValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  statCardLabel: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
    textAlign: 'center',
  },
  
  recentRidesSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  seeAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  seeAllText: {
    fontSize: 14,
    color: '#2196F3',
    fontWeight: '600',
  },
  rideCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  rideIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    marginTop: 4,
  },
  rideInfo: {
    flex: 1,
  },
  rideHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  rideLocation: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    flex: 1,
    marginRight: 12,
  },
  rideFare: {
    fontSize: 18,
    fontWeight: '700',
    color: '#4CAF50',
  },
  rideDetails: {
    gap: 8,
    marginBottom: 12,
  },
  rideDetailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  rideDetailText: {
    fontSize: 14,
    color: '#666',
  },
  rideRating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  
  quickActions: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 12,
    marginBottom: 30,
    paddingTop: 10,
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  actionIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
    textAlign: 'center',
  },
});