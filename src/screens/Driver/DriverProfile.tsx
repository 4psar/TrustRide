import React, { useState } from 'react';
import { 
  Star, 
  User, 
  ArrowLeft, 
  MoreVertical, 
  Camera, 
  Check, 
  ChartLine, 
  Wallet,
  Phone,
  Mail,
  MapPin,
  Car,
  FileText,
  Shield,
  Moon,
  Bell,
  Navigation,
  Key,
  Lock,
  LogOut,
  Edit,
  ChevronRight,
  Clock
} from "lucide-react-native"
import { 
  ScrollView, 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  Image,
  Switch,
  Dimensions, 
  Alert
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { removeFromSession } from '../../hooks/useSession';

const { width } = Dimensions.get('window')

// Type Definitions
type DocumentStatus = 'verified' | 'pending';
type IconProps = React.ReactElement;

interface InfoItemProps {
  icon: IconProps;
  label: string;
  value: string;
  verified?: boolean;
  iconColor: string;
}

interface DetailRowProps {
  label: string;
  value: string;
  badge?: boolean;
  colorIndicator?: boolean;
  typeBadge?: boolean;
}

interface DocumentItemProps {
  icon: IconProps;
  title: string;
  status: DocumentStatus;
  statusText: string;
  iconBg: string;
}

interface PreferenceItemProps {
  icon: IconProps;
  title: string;
  value?: string;
  toggle?: boolean;
  notificationDot?: boolean;
  iconColor: string;
}

// Helper Components
const InfoItem: React.FC<InfoItemProps> = ({ icon, label, value, verified, iconColor }) => (
  <TouchableOpacity style={styles.infoItem}>
    <View style={[styles.iconWrapper, { backgroundColor: iconColor }]}>
      {icon}
    </View>
    <View style={styles.infoContent}>
      <Text style={styles.infoLabel}>{label}</Text>
      <View style={styles.infoValueContainer}>
        <Text style={styles.infoValue}>{value}</Text>
        {verified && (
          <View style={styles.verifiedTag}>
            <Text style={styles.verifiedTagText}>Verified</Text>
          </View>
        )}
      </View>
    </View>
    <Edit size={14} color="#94a3b8" />
  </TouchableOpacity>
)

const DetailRow: React.FC<DetailRowProps> = ({ label, value, badge, colorIndicator, typeBadge }) => (
  <View style={styles.detailRow}>
    <Text style={styles.detailLabel}>{label}</Text>
    {badge ? (
      <View style={styles.plateBadge}>
        <Text style={styles.plateText}>{value}</Text>
      </View>
    ) : colorIndicator ? (
      <View style={styles.colorIndicator}>
        <View style={[styles.colorDot, { backgroundColor: '#d1d5db' }]}></View>
        <Text style={styles.detailValue}>{value}</Text>
      </View>
    ) : typeBadge ? (
      <View style={styles.typeBadge}>
        <Text style={styles.typeText}>{value}</Text>
      </View>
    ) : (
      <Text style={styles.detailValue}>{value}</Text>
    )}
  </View>
)

const DocumentItem: React.FC<DocumentItemProps> = ({ icon, title, status, statusText, iconBg }) => (
  <TouchableOpacity style={[
    styles.documentItem,
    status === 'pending' ? styles.pendingDocument : styles.verifiedDocument
  ]}>
    <View style={[styles.documentIcon, { backgroundColor: iconBg }]}>
      {icon}
    </View>
    <View style={styles.documentContent}>
      <Text style={styles.documentTitle}>{title}</Text>
      <View style={styles.documentStatus}>
        {status === 'verified' ? (
          <Check size={12} color="#10b981" />
        ) : (
          <Clock size={12} color="#f59e0b" />
        )}
        <Text style={[
          styles.documentStatusText,
          status === 'verified' ? styles.verifiedStatus : styles.pendingStatus
        ]}>
          {statusText}
        </Text>
      </View>
    </View>
    <ChevronRight size={16} color={status === 'verified' ? '#10b981' : '#f59e0b'} />
  </TouchableOpacity>
)

const PreferenceItem: React.FC<PreferenceItemProps> = ({ 
  icon, 
  title, 
  value, 
  toggle, 
  notificationDot, 
  iconColor 
}) => {
  const [isEnabled, setIsEnabled] = useState(false);

  return (
    <TouchableOpacity style={styles.preferenceItem}>
      <View style={styles.preferenceLeft}>
        <View style={[styles.iconWrapper, { backgroundColor: iconColor }]}>
          {icon}
          {notificationDot && <View style={styles.notificationDot}></View>}
        </View>
        <Text style={styles.preferenceTitle}>{title}</Text>
      </View>
      {toggle ? (
        <Switch
          trackColor={{ false: '#d1d5db', true: '#3b82f6' }}
          thumbColor="#ffffff"
          ios_backgroundColor="#d1d5db"
          onValueChange={() => setIsEnabled(!isEnabled)}
          value={isEnabled}
        />
      ) : (
        <View style={styles.preferenceRight}>
          {value && <Text style={styles.preferenceValue}>{value}</Text>}
          <ChevronRight size={16} color="#94a3b8" />
        </View>
      )}
    </TouchableOpacity>
  )
}

export const DriverProfile = () => {

  const handleLogput =async (event:any)=>{
    event.preventDefault();
    await removeFromSession();
    console.log('log out successfully');
    Alert.alert('success','logout successfully');
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

        {/* Profile Card with Gradient */}
        <View style={styles.profileCard}>
          <View style={styles.profileBackground}>
            <View style={styles.circle1}></View>
            <View style={styles.circle2}></View>
          </View>
          
          <View style={styles.profileImageContainer}>
            <View style={styles.profileImageWrapper}>
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80' }}
                style={styles.profileImage}
              />
              <TouchableOpacity style={styles.cameraButton}>
                <Camera size={14} color="#fff" />
              </TouchableOpacity>
              <View style={styles.verifiedBadge}>
                <Check size={10} color="#fff" />
              </View>
            </View>
            
            <Text style={styles.userName}>Michael Rodriguez</Text>
            <Text style={styles.userId}>ID: DRV-8834-NYC</Text>
            
            <View style={styles.statsContainer}>
              <View style={styles.ratingBox}>
                <Star size={16} color="#fbbf24" fill="#fbbf24" />
                <Text style={styles.ratingText}>4.8</Text>
                <Text style={styles.ratingLabel}>Rating</Text>
              </View>
              <View style={styles.onlineStatus}>
                <View style={styles.onlineDot}></View>
                <Text style={styles.onlineText}>Online</Text>
              </View>
            </View>
            
            <View style={styles.profileButtons}>
              <TouchableOpacity style={styles.profileButton}>
                <ChartLine size={18} color="#fff" />
                <Text style={styles.profileButtonText}>Stats</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.profileButton}>
                <Wallet size={18} color="#fff" />
                <Text style={styles.profileButtonText}>Earnings</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Personal Information */}
        <View style={styles.card}>
          <View style={[styles.cardHeader, styles.personalHeader]}>
            <View style={styles.cardHeaderLeft}>
              <View style={[styles.headerIcon, { backgroundColor: '#3b82f6' }]}>
                <User size={16} color="#fff" />
              </View>
              <Text style={styles.cardTitle}>Personal Info</Text>
            </View>
            <TouchableOpacity style={styles.editButton}>
              <Text style={styles.editButtonText}>Edit</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.cardContent}>
            <InfoItem 
              icon={<User size={20} color="#3b82f6" />}
              label="Full Name"
              value="Michael Rodriguez"
              iconColor="#dbeafe"
            />
            <InfoItem 
              icon={<Phone size={20} color="#10b981" />}
              label="Phone Number"
              value="+1 (555) 123-4567"
              verified={true}
              iconColor="#d1fae5"
            />
            <InfoItem 
              icon={<Mail size={20} color="#8b5cf6" />}
              label="Email Address"
              value="michael.r@example.com"
              iconColor="#ede9fe"
            />
            <InfoItem 
              icon={<MapPin size={20} color="#f97316" />}
              label="Address"
              value="42 West St, Brooklyn, NY"
              iconColor="#ffedd5"
            />
          </View>
        </View>

        {/* Vehicle Details */}
        <View style={[styles.card, styles.vehicleCard]}>
          <View style={[styles.cardHeader, styles.vehicleHeader]}>
            <View style={styles.cardHeaderLeft}>
              <View style={[styles.headerIcon, { backgroundColor: 'rgba(255,255,255,0.2)' }]}>
                <Car size={16} color="#fff" />
              </View>
              <Text style={[styles.cardTitle, { color: '#fff' }]}>My Vehicle</Text>
            </View>
            <TouchableOpacity style={styles.vehicleEditButton}>
              <Text style={styles.vehicleEditButtonText}>Update</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.vehicleContent}>
            <View style={styles.vehicleInfo}>
              <View style={styles.vehicleIcon}>
                <Car size={32} color="#fff" />
              </View>
              <View style={styles.vehicleDetails}>
                <DetailRow label="Model" value="Toyota Camry Hybrid" />
                <DetailRow label="Plate" value="NYC-8842" badge={true} />
                <DetailRow label="Color" value="Silver" colorIndicator={true} />
                <DetailRow label="Type" value="Sedan Comfort" typeBadge={true} />
              </View>
            </View>
          </View>
        </View>

        {/* Documents */}
        <View style={styles.card}>
          <View style={[styles.cardHeader, styles.documentsHeader]}>
            <View style={styles.cardHeaderLeft}>
              <View style={[styles.headerIcon, { backgroundColor: '#10b981' }]}>
                <FileText size={16} color="#fff" />
              </View>
              <Text style={styles.cardTitle}>Documents</Text>
            </View>
            <View style={styles.verifiedCount}>
              <Text style={styles.verifiedCountText}>2/3 Verified</Text>
            </View>
          </View>
          
          <View style={styles.cardContent}>
            <DocumentItem 
              icon={<User size={20} color="#fff" />}
              title="Driver License"
              status="verified"
              statusText="Verified • Exp 2025"
              iconBg="#10b981"
            />
            <DocumentItem 
              icon={<FileText size={20} color="#fff" />}
              title="Vehicle Registration"
              status="verified"
              statusText="Verified • Exp 2024"
              iconBg="#3b82f6"
            />
            <DocumentItem 
              icon={<Shield size={20} color="#fff" />}
              title="Vehicle Insurance"
              status="pending"
              statusText="Review Pending"
              iconBg="#f59e0b"
            />
          </View>
        </View>

        {/* Preferences */}
        <View style={styles.card}>
          <View style={[styles.cardHeader, styles.preferencesHeader]}>
            <View style={styles.cardHeaderLeft}>
              <View style={[styles.headerIcon, { backgroundColor: '#8b5cf6' }]}>
                <MoreVertical size={16} color="#fff" />
              </View>
              <Text style={styles.cardTitle}>Preferences</Text>
            </View>
          </View>
          
          <View style={styles.cardContent}>
            <PreferenceItem 
              icon={<MoreVertical size={20} color="#3b82f6" />}
              title="Language"
              value="English (US)"
              iconColor="#dbeafe"
            />
            <PreferenceItem 
              icon={<Moon size={20} color="#6366f1" />}
              title="Dark Mode"
              toggle={true}
              iconColor="#e0e7ff"
            />
            <PreferenceItem 
              icon={<Bell size={20} color="#ef4444" />}
              title="Notifications"
              notificationDot={true}
              iconColor="#fee2e2"
            />
            <PreferenceItem 
              icon={<Navigation size={20} color="#10b981" />}
              title="Navigation"
              value="Google Maps"
              iconColor="#d1fae5"
            />
          </View>
        </View>

        {/* Security */}
        <View style={styles.card}>
          <View style={[styles.cardHeader, styles.securityHeader]}>
            <View style={styles.cardHeaderLeft}>
              <View style={[styles.headerIcon, { backgroundColor: '#ef4444' }]}>
                <Shield size={16} color="#fff" />
              </View>
              <Text style={styles.cardTitle}>Security</Text>
            </View>
          </View>
          
          <View style={styles.cardContent}>
            <PreferenceItem 
              icon={<Key size={20} color="#3b82f6" />}
              title="Change Password"
              iconColor="#dbeafe"
            />
            <View style={styles.twoFactorItem}>
              <View style={styles.twoFactorLeft}>
                <View style={[styles.iconWrapper, { backgroundColor: '#d1fae5' }]}>
                  <Lock size={20} color="#10b981" />
                </View>
                <Text style={styles.preferenceTitle}>Two-Factor Auth</Text>
              </View>
              <View style={styles.enabledBadge}>
                <Check size={12} color="#10b981" />
                <Text style={styles.enabledText}>Enabled</Text>
              </View>
            </View>
            
            <TouchableOpacity style={styles.logoutButton} onPress={(e)=>handleLogput(e)}>
              <LogOut size={18} color="#fff" />
              <Text style={styles.logoutText}>Log Out</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Save Button */}
        {/* <TouchableOpacity style={styles.saveButton}>
          <Check size={20} color="#fff" />
          <Text style={styles.saveButtonText}>Save All Changes</Text>
        </TouchableOpacity> */}

      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  headerButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#eff6ff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  moreButton: {
    backgroundColor: '#f1f5f9',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1e293b',
  },
  profileCard: {
    margin: 20,
    borderRadius: 24,
    backgroundColor: '#667eea',
    overflow: 'hidden',
    shadowColor: '#8b5cf6',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 10,
    position:'relative',
  },
  profileBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  circle1: {
    position: 'absolute',
    width: 128,
    height: 128,
    borderRadius: 64,
    backgroundColor: 'rgba(255,255,255,0.1)',
    top: -64,
    right: -64,
  },
  circle2: {
    position: 'absolute',
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: 'rgba(255,255,255,0.1)',
    bottom: -48,
    left: -48,
  },
  profileImageContainer: {
    padding: 24,
    alignItems: 'center',
  },
  profileImageWrapper: {
    position: 'relative',
    marginBottom: 16,
  },
  profileImage: {
    width: 112,
    height: 112,
    borderRadius: 56,
    borderWidth: 4,
    borderColor: '#fff',
  },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f59e0b',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#fff',
  },
  verifiedBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#10b981',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#fff',
  },
  userName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 4,
  },
  userId: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 20,
  },
  ratingBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255,255,255,0.95)',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 16,
  },
  ratingText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1e293b',
  },
  ratingLabel: {
    fontSize: 12,
    color: '#64748b',
    fontWeight: '600',
  },
  onlineStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#10b981',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 16,
  },
  onlineDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  onlineText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#fff',
  },
  profileButtons: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
  },
  profileButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingVertical: 12,
    borderRadius: 12,
  },
  profileButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  card: {
    marginHorizontal: 20,
    marginBottom: 16,
    backgroundColor: '#fff',
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  personalHeader: {
    backgroundColor: '#dbeafe',
    borderBottomColor: '#e2e8f0',
  },
  vehicleHeader: {
    backgroundColor: 'rgba(15, 23, 42, 0.9)',
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  documentsHeader: {
    backgroundColor: '#d1fae5',
    borderBottomColor: '#e2e8f0',
  },
  preferencesHeader: {
    backgroundColor: '#ede9fe',
    borderBottomColor: '#e2e8f0',
  },
  securityHeader: {
    backgroundColor: '#fee2e2',
    borderBottomColor: '#e2e8f0',
  },
  cardHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1e293b',
  },
  editButton: {
    backgroundColor: '#3b82f6',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 8,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
  },
  vehicleEditButton: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 8,
  },
  vehicleEditButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
  },
  verifiedCount: {
    backgroundColor: '#d1fae5',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  verifiedCountText: {
    color: '#065f46',
    fontSize: 12,
    fontWeight: '700',
  },
  cardContent: {
    padding: 16,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
  },
  iconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    color: '#64748b',
    fontWeight: '500',
    marginBottom: 2,
  },
  infoValueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1e293b',
  },
  verifiedTag: {
    backgroundColor: '#d1fae5',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  verifiedTagText: {
    color: '#065f46',
    fontSize: 10,
    fontWeight: '700',
  },
  vehicleCard: {
    backgroundColor: '#0f172a',
  },
  vehicleContent: {
    padding: 16,
  },
  vehicleInfo: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  vehicleIcon: {
    width: 80,
    height: 80,
    borderRadius: 16,
    backgroundColor: '#3b82f6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  vehicleDetails: {
    flex: 1,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.6)',
    fontWeight: '500',
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#fff',
  },
  plateBadge: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
  },
  plateText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#fff',
  },
  colorIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  colorDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#fff',
  },
  typeBadge: {
    backgroundColor: '#3b82f6',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  typeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#fff',
  },
  documentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    marginBottom: 8,
  },
  verifiedDocument: {
    backgroundColor: '#d1fae5',
    borderWidth: 2,
    borderColor: '#a7f3d0',
  },
  pendingDocument: {
    backgroundColor: '#fef3c7',
    borderWidth: 2,
    borderColor: '#fde68a',
  },
  documentIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  documentContent: {
    flex: 1,
  },
  documentTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 4,
  },
  documentStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  documentStatusText: {
    fontSize: 12,
    fontWeight: '700',
  },
  verifiedStatus: {
    color: '#065f46',
  },
  pendingStatus: {
    color: '#92400e',
  },
  preferenceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f8fafc',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  preferenceLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  preferenceTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e293b',
  },
  preferenceRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  preferenceValue: {
    fontSize: 14,
    color: '#64748b',
    fontWeight: '500',
  },
  notificationDot: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#ef4444',
    borderWidth: 2,
    borderColor: '#fff',
  },
  twoFactorItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#d1fae5',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#a7f3d0',
    marginBottom: 8,
  },
  twoFactorLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  enabledBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#d1fae5',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  enabledText: {
    color: '#065f46',
    fontSize: 12,
    fontWeight: '700',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#ef4444',
    padding: 16,
    borderRadius: 12,
    marginTop: 16,
  },
  logoutText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#3b82f6',
    marginHorizontal: 20,
    marginVertical: 24,
    padding: 16,
    borderRadius: 16,
    shadowColor: '#8b5cf6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
})