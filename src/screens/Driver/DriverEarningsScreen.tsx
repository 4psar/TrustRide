import { Wallet } from "lucide-react-native";
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { LineChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

type FilterType = "Week" | "Month" | "Year";

const DriverEarningsScreen: React.FC = () => {
  const [filter, setFilter] = useState<FilterType>("Week");

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

      {/* Page Header */}
      <View style={styles.header}>
        <Text style={styles.pageTitle}>Earnings</Text>

        <View style={styles.filters}>
          {(["Week", "Month", "Year"] as FilterType[]).map(item => (
            <TouchableOpacity
              key={item}
              onPress={() => setFilter(item)}
              style={[
                styles.filterBtn,
                filter === item && styles.activeFilter,
              ]}
            >
              <Text
                style={[
                  styles.filterText,
                  filter === item && styles.activeFilterText,
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Earnings Summary Card */}
      <View style={styles.earningsCard}>
        <Text style={styles.cardTitle}>Total Earnings</Text>
        <Text style={styles.totalAmount}>$4,856.50</Text>

        <View style={styles.divider} />

        <View style={styles.row}>
          <View>
            <Text style={styles.subLabel}>This Week</Text>
            <Text style={styles.subAmount}>$1,245</Text>
          </View>

          <View>
            <Text style={styles.subLabel}>Today</Text>
            <Text style={styles.subAmount}>$156</Text>
          </View>
        </View>
      </View>

      {/* Weekly Chart */}
      <View style={styles.chartCard}>
        <Text style={styles.sectionTitle}>Weekly Earnings</Text>

        <View style={styles.chartWrapper}>
          <LineChart
            data={{
              labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
              datasets: [{ data: [120, 190, 150, 220, 180, 240, 200] }],
            }}
            width={screenWidth - 64}
            height={220}
            bezier
            withDots
            withShadow={false}
            withInnerLines={false}
            withOuterLines={false}
            chartConfig={{
              backgroundGradientFrom: "#fff",
              backgroundGradientTo: "#fff",
              decimalPlaces: 0,
              color: () => "#16a34a",
              labelColor: () => "#6b7280",
              propsForDots: {
                r: "4",
                strokeWidth: "2",
                stroke: "#16a34a",
              },
              fillShadowGradient: "#16a34a",
              fillShadowGradientOpacity: 0.12,
            }}
          />
        </View>
      </View>

      {/* Earnings Breakdown List */}
      <View style={styles.chartCard}>
        <Text style={styles.sectionTitle}>Earnings Breakdown</Text>

        {[
          { title: "Ride Earnings", sub: "156 rides", amount: "$4,245", icon: "🚗" },
          { title: "Tips", sub: "32 tips", amount: "$385", icon: "💰" },
          { title: "Bonuses", sub: "Peak hour bonus", amount: "$226", icon: "🎁" },
        ].map((item, index) => (
          <View key={index} style={styles.listItem}>
            <View style={styles.iconCircle}>
              <Text>{item.icon}</Text>
            </View>

            <View style={styles.listContent}>
              <Text style={styles.listTitle}>{item.title}</Text>
              <Text style={styles.listSub}>{item.sub}</Text>
            </View>

            <Text style={styles.listAmount}>{item.amount}</Text>
          </View>
        ))}
      </View>

      <View style={styles.withdrawContainer}>
        <TouchableOpacity style={styles.withdrawButton}>
            <Wallet color={'#fff'}/>
            <Text style={styles.withdrawText}>Withdraw Earnings</Text>
        </TouchableOpacity>
      </View>

    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafb",
    padding: 20,
  },

  /* Header */
  header: {
    marginBottom: 16,
  },

  pageTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 12,
  },

  filters: {
    flexDirection: "row",
  },

  filterBtn: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    backgroundColor: "#e5e7eb",
    marginRight: 8,
  },

  activeFilter: {
    backgroundColor: "#16a34a",
  },

  filterText: {
    fontSize: 13,
    color: "#374151",
  },

  activeFilterText: {
    color: "#fff",
    fontWeight: "600",
  },

  /* Earnings Card */
  earningsCard: {
    backgroundColor: "#22c55e",
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
  },

  cardTitle: {
    color: "#dcfce7",
    fontSize: 14,
  },

  totalAmount: {
    color: "#fff",
    fontSize: 34,
    fontWeight: "bold",
    marginTop: 6,
  },

  divider: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.35)",
    marginVertical: 16,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  subLabel: {
    color: "#dcfce7",
    fontSize: 13,
  },

  subAmount: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    marginTop: 4,
  },

  /* Chart */
  chartCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    elevation: 2,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },

  chartWrapper: {
    marginTop: 12,
    overflow: "hidden",
  },

  /* List */
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
  },

  iconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#dcfce7",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  listContent: {
    flex: 1,
  },

  listTitle: {
    fontSize: 15,
    fontWeight: "500",
    color: "#111827",
  },

  listSub: {
    fontSize: 12,
    color: "#6b7280",
    marginTop: 2,
  },

  listAmount: {
    fontSize: 15,
    fontWeight: "600",
    color: "#16a34a",
  },

  withdrawContainer:{
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 20,
    marginBottom: 40,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
    backgroundColor:"#22c55e",
  },

  withdrawButton:{
    width:"100%",
    height:"auto",
    display:'flex',
    flexDirection:'row',
    gap:10,
    textAlign:'center',
    alignItems:'center',
    justifyContent:'center'
  },

  withdrawText:{
    fontSize:18,
    color:'#fff',
    fontWeight:'500'
  }
});



export default DriverEarningsScreen;
