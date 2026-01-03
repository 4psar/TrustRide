import React, { useState } from "react"
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  RefreshControl
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import {
  Car,
  CheckCircle,
  Clock,
  XCircle,
  MapPin,
  Calendar,
  DollarSign,
  ChevronRight,
  Filter,
  Search
} from "lucide-react-native"

// Mock data for rides
const ridesData = {
  ongoing: [
    {
      id: "1",
      from: "Downtown Mall",
      to: "Airport Terminal 3",
      date: "Today, 10:30 AM",
      driver: "John D.",
      car: "Toyota Camry • ABC123",
      price: "$24.50",
      status: "onway",
      estimatedTime: "15 min",
      pickupCode: "A3B7"
    },
    {
      id: "2",
      from: "Central Station",
      to: "Tech Park",
      date: "Today, 11:45 AM",
      driver: "Sarah M.",
      car: "Honda Civic • XYZ789",
      price: "$18.75",
      status: "waiting",
      estimatedTime: "5 min",
      pickupCode: "C8D2"
    }
  ],
  completed: [
    {
      id: "3",
      from: "Home",
      to: "Office",
      date: "Yesterday, 9:15 AM",
      driver: "Mike T.",
      car: "Tesla Model 3 • TES123",
      price: "$32.00",
      status: "completed",
      rating: 5,
      distance: "12.5 km"
    },
    {
      id: "4",
      from: "Restaurant",
      to: "Movie Theater",
      date: "Nov 28, 7:30 PM",
      driver: "Emma L.",
      car: "Hyundai Elantra • HYN456",
      price: "$14.50",
      status: "completed",
      rating: 4,
      distance: "6.2 km"
    }
  ],
  cancelled: [
    {
      id: "5",
      from: "Hotel",
      to: "Convention Center",
      date: "Nov 25, 2:00 PM",
      reason: "Driver cancelled",
      price: "$0.00",
      status: "cancelled"
    },
    {
      id: "6",
      from: "Gym",
      to: "Supermarket",
      date: "Nov 24, 5:45 PM",
      reason: "Passenger cancelled",
      price: "$0.00",
      status: "cancelled"
    }
  ]
}

type TabType = 'ongoing' | 'completed' | 'cancelled'

const RideCard = ({ ride, type }: { ride: any, type: TabType }) => {
  const getStatusColor = () => {
    if (type === 'ongoing') return '#3B82F6'
    if (type === 'completed') return '#10B981'
    return '#EF4444'
  }

  const getStatusIcon = () => {
    if (type === 'ongoing') return <Clock size={16} color="#3B82F6" />
    if (type === 'completed') return <CheckCircle size={16} color="#10B981" />
    return <XCircle size={16} color="#EF4444" />
  }

  const getStatusText = () => {
    if (type === 'ongoing') return 'In Progress'
    if (type === 'completed') return 'Completed'
    return 'Cancelled'
  }

  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={[styles.statusBadge, { backgroundColor: `${getStatusColor()}15` }]}>
          {getStatusIcon()}
          <Text style={[styles.statusText, { color: getStatusColor() }]}>
            {getStatusText()}
          </Text>
        </View>
        <Text style={styles.dateText}>{ride.date}</Text>
      </View>

      <View style={styles.routeContainer}>
        <View style={styles.routeDot}>
          <View style={[styles.dot, { backgroundColor: getStatusColor() }]} />
          <View style={styles.verticalLine} />
        </View>
        <View style={styles.routeDetails}>
          <View style={styles.locationRow}>
            <MapPin size={16} color="#6B7280" />
            <Text style={styles.locationText}>{ride.from}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.locationRow}>
            <MapPin size={16} color={getStatusColor()} />
            <Text style={styles.locationText}>{ride.to}</Text>
          </View>
        </View>
      </View>

      <View style={styles.cardFooter}>
        <View style={styles.detailsRow}>
          <View style={styles.detailItem}>
            <Car size={14} color="#6B7280" />
            <Text style={styles.detailText}>{ride.car || 'N/A'}</Text>
          </View>
          <View style={styles.detailItem}>
            <DollarSign size={14} color="#6B7280" />
            <Text style={styles.detailText}>{ride.price}</Text>
          </View>
        </View>

        {type === 'ongoing' && ride.estimatedTime && (
          <View style={styles.ongoingInfo}>
            <Clock size={14} color="#3B82F6" />
            <Text style={styles.estimatedText}>Arriving in {ride.estimatedTime}</Text>
          </View>
        )}

        {type === 'cancelled' && ride.reason && (
          <Text style={styles.cancelledReason}>Reason: {ride.reason}</Text>
        )}

        <TouchableOpacity style={styles.actionButton}>
          <Text style={[styles.buttonText, { color: getStatusColor() }]}>
            {type === 'ongoing' ? 'Track Ride' : 'View Details'}
          </Text>
          <ChevronRight size={16} color={getStatusColor()} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const EmptyState = ({ type }: { type: TabType }) => {
  const messages = {
    ongoing: "No active rides",
    completed: "No completed rides yet",
    cancelled: "No cancelled rides"
  }

  const icons = {
    ongoing: <Clock size={64} color="#9CA3AF" />,
    completed: <CheckCircle size={64} color="#9CA3AF" />,
    cancelled: <XCircle size={64} color="#9CA3AF" />
  }

  return (
    <View style={styles.emptyState}>
      {icons[type]}
      <Text style={styles.emptyStateText}>{messages[type]}</Text>
      <Text style={styles.emptyStateSubtext}>
        {type === 'ongoing'
          ? "Book a new ride to get started"
          : "Your rides will appear here"}
      </Text>
    </View>
  )
}

export const UserRidesList = () => {
  const [activeTab, setActiveTab] = useState<TabType>('ongoing')
  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = () => {
    setRefreshing(true)
    // Simulate API call
    setTimeout(() => setRefreshing(false), 1000)
  }

  const getRides = () => ridesData[activeTab]

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>My Rides</Text>
          <Text style={styles.subtitle}>Manage and track your trips</Text>
        </View>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.iconButton}>
            <Search size={24} color="#4B5563" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Filter size={24} color="#4B5563" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        {(['ongoing', 'completed', 'cancelled'] as TabType[]).map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Text>
            {activeTab === tab && <View style={styles.tabIndicator} />}
          </TouchableOpacity>
        ))}
      </View>

      {/* Content */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={styles.scrollContent}
      >
        {getRides().length === 0 ? (
          <EmptyState type={activeTab} />
        ) : (
          getRides().map((ride) => (
            <RideCard key={ride.id} ride={ride} type={activeTab} />
          ))
        )}

        {activeTab === 'completed' && getRides().length > 0 && (
          <View style={styles.statsCard}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{getRides().length}</Text>
              <Text style={styles.statLabel}>Total Rides</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>
                ${getRides().reduce((sum, ride) => sum + parseFloat(ride.price.replace('$', '')), 0).toFixed(2)}
              </Text>
              <Text style={styles.statLabel}>Total Spent</Text>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#111827',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
  headerActions: {
    flexDirection: 'row',
  },
  iconButton: {
    marginLeft: 12,
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },

  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  activeTab: {
    position: 'relative',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#9CA3AF',
  },
  activeTabText: {
    color: '#111827',
  },
  tabIndicator: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 3,
    backgroundColor: '#3B82F6',
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#F3F4F6',
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
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusText: {
    marginLeft: 6,
    fontSize: 12,
    fontWeight: '600',
  },

  dateText: {
    fontSize: 12,
    color: '#6B7280',
  },
  routeContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  routeDot: {
    alignItems: 'center',
    marginRight: 12,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  verticalLine: {
    width: 2,
    height: 40,
    backgroundColor: '#E5E7EB',
    marginTop: 4,
  },
  routeDetails: {
    flex: 1,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  locationText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#374151',
    flex: 1,
  },

  divider: {
    height: 1,
    backgroundColor: '#F3F4F6',
    marginLeft: 4,
    marginVertical: 8,
  },
  cardFooter: {
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    paddingTop: 16,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    marginLeft: 6,
    fontSize: 13,
    color: '#6B7280',
  },

  ongoingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginBottom: 12,
  },
  estimatedText: {
    marginLeft: 8,
    fontSize: 13,
    color: '#1D4ED8',
    fontWeight: '500',
  },

  cancelledReason: {
    fontSize: 13,
    color: '#DC2626',
    backgroundColor: '#FEF2F2',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginBottom: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: '#F9FAFB',
  },
  buttonText: {
    marginRight: 4,
    fontSize: 14,
    fontWeight: '600',
  },

  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#9CA3AF',
    textAlign: 'center',
  },
  statsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '800',
    color: '#111827',
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#F3F4F6',
  },
})